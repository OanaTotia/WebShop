import { browser, element, by } from 'protractor';

export class Angular2ExamProjectPage {
  navigateTo() {
    return browser.get('/');
  }
  navigateToAllGames(){
    return browser.get('/all-games');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  getGames(){
    return element.all(by.css("div.games"));
  }

  getFirstGame(){
    return element(by.css("div.game"));
  }

  getDeleteButton(){
    return element(by.css(".delete"));
  }
}

