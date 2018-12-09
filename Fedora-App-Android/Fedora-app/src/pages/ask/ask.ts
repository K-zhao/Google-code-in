import { Component } from '@angular/core';
import { Browser } from '../../providers/browser/browser';
import { AskFedoraService, Question } from '../../providers/ask-fedora/ask-fedora';

/**
 * Shows latest questions from Ask Fedora
 *
 * Fetches latest 30 questions from Ask Fedora and displays the questions, the
 * answers and the number of votes each question receives.
 */
@Component({
  templateUrl: 'ask.html',
  providers: [Browser, AskFedoraService],
})
export class AskPage {
  /**
   * Set active segment as latest questions
   */
  showQuestionsBy: String = "new";

  /**
   * Stores list of displayed questions
   */
  private questions: Question[];

  constructor(private browser: Browser,
    private askFedora: AskFedoraService) {
    this.questions = [];
  }

  ngOnInit() {
    this.updateQuestions('activity');
  }

  /**
   * Fetch a list of latest questions using Ask Fedora API.
   */
  updateQuestions(type: string): void {
    this.askFedora
      .getQuestions(type)
      .subscribe(questions => {
        this.questions = questions || [];
      });
  }

  onSegmentChange() {
    switch (this.showQuestionsBy) {
      case "new":
        this.updateQuestions('activity');
        break;
      case "votes":
        this.updateQuestions('votes');
        break;
      case "answers":
        this.updateQuestions('answers');
        break;
    }
  }

  /**
   * Open a question in a browser.
   *
   * Opens question in an in-app browser in mobile app and in a new tab on desktop.
   *
   * @param question question to open
   */
  openQuestion(question: Question): void {
    this.browser.open(question.link);
  }
}
