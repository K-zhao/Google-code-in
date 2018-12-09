import { map } from 'rxjs/operators';
import { OperatorFunction } from 'rxjs/interfaces';

/**
 * Choose appropriate API end point or the proxy to avoid CORS in Ionic dev server
 *
 * @param devServerEndpoint endpoint in Ionic dev server
 * @param appEndpoint       endpoint to use in real application
 */
export function chooseEndpoint(devServerEndpoint: string, appEndpoint: string) {
  // courtesy: https://forum.ionicframework.com/t/check-if-run-on-emulator-dev-production-or-livereload/71845/9
  return window.hasOwnProperty('IonicDevServer') ? devServerEndpoint : appEndpoint;
}

/**
 * Substitutes a falsy value in a RxJS stream with a default value
 * @param value the default value
 */
export function defaultValue<T>(value: T): OperatorFunction<T, T> {
  return map<T, T>((x: T) => x ? x : value);
}

/* Function to beautify the post date to human readable form
* @param postDate actual time of the post
* @returns Beautified date in format MM DD at HH:MM for social media post and MM DD, YY for blog posts
*/

export function beautifyDate(postDate: any, type: string): string {

  let jsDate: any = new Date(postDate);
  if (type === 'social') {
    let ptime = jsDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    jsDate = jsDate.toString().split(' ');
    let pdate: string = jsDate[1] + ' ' + jsDate[2];
    return (pdate + ' at ' + ptime);
  } else if (type === 'blog') {
    jsDate = jsDate.toString().split(' ')
    return jsDate[1] + ' ' + jsDate[2] + ', ' + jsDate[3];
  }
}

/**
 * Function to convert EPOCH time to relative time
 * @param timestamp actual timestamp of the post
 * @returns Relative time in format HH/MM ago
 */

export function convertToRelativeTime(timestamp: any): string {
  //convert EPOCH Time to javascript time
  timestamp = parseInt(timestamp) * 1000;

  //get current time
  var current: any = new Date();

  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = current - timestamp;

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + ' seconds ago';
  }

  else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + ' minutes ago';
  }

  else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + ' hours ago';
  }

  else if (elapsed < msPerMonth) {
    return Math.round(elapsed / msPerDay) + ' days ago';
  }

  else if (elapsed < msPerYear) {
    return Math.round(elapsed / msPerMonth) + ' months ago';
  }

  else {
    return Math.round(elapsed / msPerYear) + ' years ago';
  }
}

 /* Return the type of package from it names.
 *
 * Matches the name against the Fedora packaging guidelines
 * Taken from: https://fedoraproject.org/wiki/Packaging:Naming?rd=Packaging:NamingGuidelines
 * @param pkgName package name
 */
export function getPackageType(pkgName:string) {
  if (pkgName.endsWith('-devel')) {
    return 'pkg-devel';
  } else if (pkgName.endsWith('-libs')) {
    return 'pkg-lib';
  } else if(pkgName.endsWith('-doc')) {
    return 'pkg-doc';
  } else if(/^\w*-langpack(-[a-zA-Z]{2})?$/.test(pkgName)) {
    return 'pkg-langpack';
  } else if(pkgName.endsWith('-fonts')) {
    return 'pkg-font';
  }

  return '';
}

