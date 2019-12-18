import { Angular2ExamProjectPage } from './app.po';
import { browser, element, by, protractor} from 'protractor';  
var origFn = browser.driver.controlFlow().execute;

browser.driver.controlFlow().execute = function() {
  var args = arguments;

  // queue 100ms wait
  origFn.call(browser.driver.controlFlow(), function() {
    return protractor.promise.delayed(100);
  });

  return origFn.apply(browser.driver.controlFlow(), args);
};



describe('angular2-exam-project app', () => {
  let page: Angular2ExamProjectPage;

  beforeEach(() => {
    page = new Angular2ExamProjectPage();
  });

  it('The title of the page should be Web', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Web');
  });


////////////////////all tests related to all-games page

  it("the name of all the games in all-games page should be defined", () => {
    browser.get('/all-games');
    let names = element.all(by.css('div.name'));
    expect(names).toBeDefined();
  });

it("the game should be able to be deleted", ()=>{
    page.navigateToAllGames();

    let oldGames = page.getGames().count();

    let deleteButton = element.all(by.css('div.delete')).last();
    
    deleteButton.click();
    browser.refresh();
    browser.get('/all-games');
    let newGames = page.getGames().count();
    
    expect(newGames>oldGames).toBe(true);


});


/////////////////add a game test


  it("should be able to add a new game", ()=> {
    browser.get('/all-games');
    let oldGames = page.getGames().count();
    
    
    browser.get('/add-game');

    let newGameName = element(by.css('input.inputName'));
    newGameName.sendKeys('Catan-expansion');

    let newGameDescription = element(by.css('input.inputDescription'));
    newGameDescription.sendKeys("A great multiplayer game :D ");

    let newGameUrl = element(by.css('input.inputUrl'));
    newGameUrl.sendKeys('http://hobbyshop.lt/23627-thickbox_default/katan-papildymas-miestai-ir-riteriai-cities-knights.jpg')
    
    let newGameUnitPrice = element(by.css('input.inputUnitPrice'));
    newGameUnitPrice.sendKeys(20)
    
    let newGameStock = element(by.css('input.inputStock'));
    newGameStock.sendKeys(35)
  
    let saveButton = element(by.css('button.button'));
    saveButton.click();

    browser.refresh();
    browser.get('/all-games');

    let newGames = page.getGames().count();
    
    expect(newGames>oldGames).toBe(true);
  });

});
