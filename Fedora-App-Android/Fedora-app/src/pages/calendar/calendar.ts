import { Component } from '@angular/core';
import { Calendar } from '@ionic-native/calendar';
import { ModalController, ViewController, NavParams, NavController, ToastController } from 'ionic-angular';

import { NotificationsPage } from '../../pages/notifications/notifications';
import { FedoCalService, Calendar as CalendarType, Meeting } from '../../providers/fedo-cal/fedo-cal';


/**
 * We default to the QA calendar
 */
const DEFAULT_CALENDAR = { realName: 'QA', displayName: 'QA' };

/**
 * The FedoCal interface
 *
 * Shows the list of calendars availabe on FedoCal and the meetings of each
 * calendar. Also allows to add meetings from the calendar to the system calendar.
 */
@Component({
  templateUrl: 'calendar.html',
  providers: [FedoCalService, Calendar]
})
export class CalendarPage {

  /**
   * Set the current active segment as Upcoming Events in the interface
   */
  showEventsBy: string = "upcoming";

  /**
   * List of calendars in FedoCal
   */
  public calendars: CalendarType[];

  /**
   * List of meetings in the selected calendar
   */
  private meetings: Meeting[];

  /**
   * ID of the selected calendar
   */
  public selectedCalendar: CalendarType;

  constructor(private fedoCal: FedoCalService, private calendar: Calendar, public modalCtrl: ModalController, public navCtrl: NavController) {
    this.calendars = [];
    this.meetings = [];

    this.selectedCalendar = DEFAULT_CALENDAR as CalendarType;
  }

  ngOnInit() {
    this.updateCalendars();
    /**
     * Fetch upcoming meetings
     */
    this.updateMeetings('start');
  }

  /**
   * Change the meeting view according to active segment
   */
  onSegmentChange() {
    this.showEventsBy == 'upcoming' ? this.updateMeetings('start') : this.updateMeetings('end');
  }

  /**
   * Update the list of calendars from FedoCal
   */
  updateCalendars(): void {
    this.fedoCal
      .getCalendars()
      .subscribe(calendars => {
        this.calendars = calendars;
      });
  }

  /**
   * Update the list of meetings for the selected calendar
   * @param type type of meetings to fetch, upcoming or past
   */
  updateMeetings(type: string): void {
    this.fedoCal
      .getMeetings(this.selectedCalendar, type)
      .subscribe(meetings => {
        this.meetings = meetings;
      });
  }

  /**
   * Opens up the search modal component
   */
  showSearch() {
    let searchModal = this.modalCtrl.create(Search, { calendars: this.calendars }, {
      cssClass: "search-modal",
      showBackdrop: false,
      enableBackdropDismiss: false
    });
    /**
     * Update calendars when search modal closes
     */
    searchModal.onDidDismiss(data => {
      //Update calendar only if choice is made
      if (data !== undefined) {
        let receivedCalendar = { realName: data.calendarChoice };
        this.selectedCalendar = receivedCalendar as CalendarType;
        this.showEventsBy == 'upcoming' ? this.updateMeetings('start') : this.updateMeetings('end');
      }
    });
    searchModal.present();
  }

  /**
   * Add a FedoCal meeting to the system calendar
   *
   * @param meeting meeting to add to the calendar
   */
  addToCalendar(meeting: Meeting): void {
    this.calendar.createEventInteractively(
      meeting.name,
      meeting.location,
      meeting.description,
      meeting.time,
      meeting.timeEnd
    );
  }

  /**
   * Compares two calendars for similarity
   *
   * @param a Calendar
   * @param b Calendar
   * @returns boolean value indicating if both calendars are equal
   */
  compareCalendar(a: CalendarType, b: CalendarType) {
    return a.realName === b.realName;
  }


  /**
   * Open the notifications pane from the home page
   */
  openNotificationPage() {
    this.navCtrl.push(NotificationsPage, { animate: true, direction: 'forward' });
  }

  /**
   * Pushes the meeting details page for specific meeting
   * @param meeting meeting page to open
   */
  openMeetingDetails(meeting: Meeting) {
    this.navCtrl.push(meetingDetails, { meeting: meeting });
  }
}

/**
 * Search Modal Component
 */

@Component({
  templateUrl: 'search.html',
  selector: 'searchpage',
  providers: [FedoCalService, Calendar]
})
export class Search {

  public calendars: any;

  //to store the calendars in one place when reseting the list during search query
  public allCalendars: any;


  //Initialize array for showing calendar icon
  calendarIcon: string[] = [];
  //set icon values
  activeIcon: string = './assets/img/star-active.svg';
  inactiveIcon: string = './assets/img/star-inactive.svg';

  constructor(public viewCtrl: ViewController, navParams: NavParams, public toastCtrl: ToastController) {
    //store all the calendars in one place
    this.allCalendars = navParams.get('calendars');

    //initialise active list
    this.calendars = this.allCalendars;
    for (let i = 0; i < this.calendars.length; i++) {
      //update src of icon
      this.calendarIcon[i] = this.inactiveIcon;
    }
  }

  /**
   * Listens to input on the search bar
   * 
   * Returns calendars matching the query
   * 
   * @param query search query entered in the input box
   */
  onInput(query: string): void {

    //reset the value of list
    this.calendars = this.allCalendars

    // if the value is an empty string don't filter the items
    if (!query) {
      return;
    }

    this.calendars = this.calendars.filter((v) => {
      console.log(v);
      if (v.realName && query) {
        if (v.realName.toLowerCase().indexOf(query.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }
  /**
   * Function called when someone taps the star to subscribe to the calendar
   */
  subscribeToCal(calendar: CalendarType, i: number): void {
    /**
     * Declare toasts for showing events
     */
    const subscribedToast = this.toastCtrl.create({
      message: 'Subscribed to calendar: ' + calendar.realName,
      duration: 2000
    });
    const unsubscribedToast = this.toastCtrl.create({
      message: 'Unsubscribed from calendar: ' + calendar.realName,
      duration: 2000
    });

    /**
     * Fire event on the basis of selected icon
     */
    if (this.calendarIcon[i] === this.inactiveIcon) {
      this.calendarIcon[i] = this.activeIcon;
      subscribedToast.present();
    } else {
      this.calendarIcon[i] = this.inactiveIcon;
      unsubscribedToast.present();
    }
  }
}

@Component({
  templateUrl: 'meeting-details.html',
  selector: 'meetingdetails',
  providers: [Calendar]
})

export class meetingDetails {
  private meeting: Meeting;
  constructor(public navCtrl: NavController, params: NavParams, private calendar: Calendar) {
    this.meeting = params.data.meeting;
  }

  /**
 * Add a FedoCal meeting to the system calendar
 *
 * @param meeting meeting to add to the calendar
 */
  addToCalendar(meeting: Meeting): void {
    this.calendar.createEventInteractively(
      meeting.name,
      meeting.location,
      meeting.description,
      meeting.time,
      meeting.timeEnd
    );
  }
}