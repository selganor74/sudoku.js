import { Ng2GuiPage } from './app.po';

describe('ng2-gui App', function() {
  let page: Ng2GuiPage;

  beforeEach(() => {
    page = new Ng2GuiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
