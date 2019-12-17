import { Angular2ExamProjectPage } from './app.po';
import { browser, element, by} from 'protractor';  

describe('angular2-exam-project app', () => {
  let page: Angular2ExamProjectPage;

  beforeEach(() => {
    page = new Angular2ExamProjectPage();
  });

  it('the title of the page should be Nerd', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Nerd');
  });


////////////////////all tests related to all-games page


  it("the name of the game in all-games page should be defined", () => {
    browser.get('/all-games');
    let name = element(by.css('div.name'));
    expect(name).toBeDefined();

  });

  it("the description of the game in all-games page should be defined", () => {
    browser.get('/all-games');
    let description = element(by.css('div.description'));
    expect(description).toBeDefined();
  });


// it("the game should be able to be deleted", ()=>{
//     page.navigateToAllGames();
    
//     let deleteButton = page.getFirstGame();
//     deleteButton.click();

//     expect(deleteButton).toBeDefined();

// });


/////////////////all tests related to add-game page
  
  it("in the add-game page the name of the game should be empty", () => {
    browser.get('/add-game');
    let gameName = element(by.css('div.name'));
    let text = gameName.getText();
    expect(gameName.getText()).toEqual('');
  });


  it("should be able to add a new game", ()=> {
    browser.get('/add-game');

    let newGameName = element(by.css('input.inputName'));
    newGameName.sendKeys('Catan-expansion');

    let newGameDescription = element(by.css('input.inputDescription'));
    newGameDescription.sendKeys("A great multiplayer game :D ");

    let newGameUrl = element(by.css('input.inputUrl'));
    newGameUrl.sendKeys('http://hobbyshop.lt/23627-thickbox_default/katan-papildymas-miestai-ir-riteriai-cities-knights.jpg')
    
    
    let saveButton = element(by.css('button.button'));
    saveButton.click();
    
  });

});
