import { AppPage } from './app.po';
describe('vaya-angular-front App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect<any>(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
