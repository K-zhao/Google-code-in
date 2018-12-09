import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { MagazinePage } from '../magazine/magazine';
import { CalendarPage } from '../calendar/calendar';
import { AskPage } from '../ask/ask';
import { MorePage } from '../more/more';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  /**
   * set the root of the tabs
   */
  tab1Root = HomePage;
  tab2Root = MagazinePage;
  tab3Root = CalendarPage;
  tab4Root = AskPage;
  tab5Root = MorePage;
  constructor() {

  }
}