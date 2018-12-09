import { Component } from '@angular/core';

@Component({
  selector: 'no-internet',
  templateUrl: 'no-internet.html'
})
export class NoInternetComponent {

  constructor() {
  }

  //reloads the page
  reload(){
    location.reload();
  }

}
