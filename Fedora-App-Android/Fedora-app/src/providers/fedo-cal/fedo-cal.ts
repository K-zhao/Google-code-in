import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { merge } from 'rxjs/observable/merge';
import { tap, map } from 'rxjs/operators';
import { chooseEndpoint, defaultValue } from '../../utils';
import { startCase } from 'lodash-es';

/**
 * FedoCal API endpoint
 *
 * It does not support CORS so we have to proxy it through Ionic CLI during development
 */
const ENDPOINT = chooseEndpoint('/fedocal', 'https://apps.fedoraproject.org/calendar/api');

/**
 * The key used for storing offline content
 */
const CALENDAR_STORAGE_KEY = 'fedocal__calendars';

/**
 * Convert calendar name from API to a value suitable for display
 *
 * Convert title to capital case, but skip special names like FESCo, FAmSCo, i18n
 *
 * @param name Calendar name as in API
 * @returns    Friendly representation of the name
 */
function calendarNameToDisplayName(name: string): string {
  switch (name) {
    case 'i18n':
      return 'i18n';
    case 'fesco':
      return 'FESCo';
    default:
      return /^[A-Z][^\d-]*.*$/.test(name) ? name : startCase(name);
  }
}

/**
 * Get the key for offline storage which stores the meetings for the given Calendar
 *
 * @param calendar Calendar
 * @returns key to use while accessing offline content
 */
function getCalendarStorageKey(calendar: Calendar): string {
  return `fedocal__meetings-${calendar.realName}`;
}

/**
 * A calendar on FedoCal
 *
 * Calendars are assoicated with a group / SIG / or event. They contain a number
 * of recurring meetings or events.
 */
export interface Calendar {

  /**
   * Name of calendar, as expressed in the API
   *
   * Serves as an ID for API calls.
   */
  realName: string,

  /**
   * Human friendly calendar name obtained from `realName`
   */
  displayName: string,

  /**
   * Calendar's description
   */
  description: string,

  /**
   * Group with admin previlages for this calendar
   */
  adminGroup: string,

  /**
   * Group with edit previlages for this calendar
   */
  editorGroup: string,

  /**
   * Contact person for this calendar
   */
  contact: string,

  /**
   * Whether the calendar is enabled
   */
  enabled: boolean,
}

/**
 * A meeting on a FedoCal calendar
 */
export interface Meeting {

  /**
   * Name of the meeting
   */
  name: string,

  /**
   * Description of the meeting
   */
  description: string,

  /**
   * Where is the meeting happening?
   *
   * Can be an IRC channel or even a physical location.
   */
  location: string,

  /**
   * Meeting start time
   */
  time: Date,

  /**
   * Meeting end time
   */
  timeEnd: Date,
}

/**
 * Service for FedoCal
 */
@Injectable()
export class FedoCalService {

  constructor(private http: HttpClient, private storage: Storage) {
  }

  /**
   * Fetch the list of calendars on FedoCal from offline cache
   *
   * @returns Observable which emits an array of posts
   */
  private loadCachedCalendars(): Observable<Calendar[]> {
    return fromPromise(this.storage.get(CALENDAR_STORAGE_KEY)).pipe(defaultValue([]));
  }

  /**
   * Fetch the list of calendars from FedoCal API
   *
   * @returns Observable which emits an array of calendars
   */
  fetchCalendars(): Observable<Calendar[]> {
    return this.http.get(`${ENDPOINT}/calendars/`)
      .pipe(
        map((data: any) =>
          data.calendars.map((c: any) => ({
            realName: c.calendar_name,
            displayName: calendarNameToDisplayName(c.calendar_name),
            description: c.calendar_description,
            contact: c.calendar_contact,
            adminGroup: c.calendar_admin_group,
            editorGroup: c.calendar_editor_group,
            enabled: c.calendar_status === 'Enabled'
          })))
      );
  }

  /**
   * Fetch the list of calendars from FedoCal
   *
   * Loads from offline cache first and then from API. The response of the API
   * request is persisted into the disk cache for further requests.
   *
   * @returns Observable which emits an array of calendars
   */
  getCalendars(): Observable<Calendar[]> {
    return merge(this.loadCachedCalendars(), this.fetchCalendars().pipe(
      tap(x => this.storage.set(CALENDAR_STORAGE_KEY, x))
    ));
  }

  /**
   * Fetch the list of meetings for a given FedoCal calendar name from offline
   * cache
   *
   * @param calendar FedoCal calendar name
   * @returns Observable which emits an array of meetings
   */
  private loadCachedMeetings(calendar: Calendar): Observable<Meeting[]> {
    return fromPromise(this.storage.get(getCalendarStorageKey(calendar))).pipe(defaultValue([]));
  }

  /**
   * Fetch the list of meetings for a given FedoCal calendar name
   *
   * @param calendar FedoCal calendar name
   * @param type Type of Meetings to fetch:
   * - start(starting after today i.e upcoming meetings)
   * - end(ended today i.e past meetings)
   * @returns Observable which emits an array of meetings
   */
  fetchMeetings(calendar: Calendar, type: string): Observable<Meeting[]> {

    /**
     * set search parameters to current date in order to get past and upcoming events
     */
    let todaysDate: any = new Date();
    todaysDate = todaysDate.toISOString().split('T')[0];

    return this.http.get(`${ENDPOINT}/meetings/`, { params: { calendar: calendar.realName, [type]: todaysDate } })
      .pipe(
        map((data: any) => data.meetings.map(m => {
          // FedoCal splits an ISO8601 string and sends us the date and time,
          // combine them together
          const mTime: Date = new Date(`${m.meeting_date}T${m.meeting_time_start}Z`);
          const mTimeEnd: Date = new Date(`${m.meeting_date_end}T${m.meeting_time_stop}Z`);

          return {
            name: m.meeting_name,
            description: m.meeting_information,
            time: mTime,
            timeEnd: mTimeEnd,
            location: m.meeting_location,
          };
        }))
      );
  }

  /**
   * Fetch the list of meetings for a given FedoCal calendar name
   *
   * Loads from offline cache first and then from API. The response of the API
   * request is persisted into the disk cache for further requests.
   *
   * @param calendar FedoCal calendar name
   * @param type Type of Meetings to fetch:
   * - start(starting after today i.e upcoming meetings)
   * - end(ended today i.e past meetings)
   * @returns Observable which emits an array of meetings
   */
  getMeetings(calendar: Calendar, type: string): Observable<Meeting[]> {
    return merge(this.loadCachedMeetings(calendar), this.fetchMeetings(calendar, type).pipe(
      tap(x => this.storage.set(getCalendarStorageKey(calendar), x))
    ));
  }
}

