import { ColorGamePage } from './app.po';

describe('color-game App', () => {
  let page: ColorGamePage;

  beforeEach(() => {
    page = new ColorGamePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
