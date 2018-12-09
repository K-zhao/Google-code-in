import { async, TestBed } from '@angular/core/testing';
import { IonicModule, Platform } from 'ionic-angular';

import { SplashScreen } from '@ionic-native/splash-screen';

import { App } from './app.component';
import { PlatformMock, SplashScreenMock } from 'ionic-mocks';

describe('MyApp Component', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [App],
      imports: [
        IonicModule.forRoot(App)
      ],
      providers: [
        { provide: SplashScreen, useFactory: () => SplashScreenMock.instance() },
        { provide: Platform, useFactory: () => PlatformMock.instance() }
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component instanceof App).toBe(true);
  });
});
