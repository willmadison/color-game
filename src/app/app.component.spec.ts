import {TestBed, async} from '@angular/core/testing';

import {AppComponent} from './app.component';
import {ColorService} from "./color.service";

export class FakeColorService {
  private callCount = 0;

  randomColor(): string {
    switch (this.callCount++) {
      case 0:
        return 'rgb(165, 178, 138)';
      case 1:
        return 'rgb(189, 93, 51)';
      case 2:
        return 'rgb(22, 132, 141)';
      case 3:
        return 'rgb(187, 75, 124)';
      case 4:
        return 'rgb(17, 77, 80)';
      case 5:
        return 'rgb(239, 200, 98)';
      default:
        return 'rgb(199, 119, 9)';
    }
  }
}

describe('AppComponent', () => {
  let fixture;
  let app;
  let compiled;

  const goalBackground = 'background: rgb(239, 200, 98)';

  beforeEach(() => {
    spyOn(Math, 'random').and.returnValue(0.9441226570562253);

    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ]
    }).compileComponents();

    TestBed.overrideComponent(AppComponent, {
      set: {
        providers: [{ provide: ColorService, useClass: FakeColorService }]
      }
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    app = fixture.debugElement.componentInstance;
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
    expect(compiled).toBeTruthy();
  });

  it('should display the title', () => {
    expect(compiled.querySelector('h1').textContent).toContain('The Great rgb(239, 200, 98) Color Game');
  });

  it('should display different colors for each of the squares', () => {
    expect(compiled.querySelectorAll('.square')[5].style.cssText).toContain(goalBackground);
  });

  it('should display correct message when user clicks on correct square', () => {
    compiled.querySelectorAll('.square')[5].click();
    fixture.detectChanges();

    expect(compiled.querySelector('#message').textContent).toContain('Correct!');

    for (let square of compiled.querySelectorAll('.square')) {
      expect(square.style.cssText).toContain(goalBackground);
    }

    expect(compiled.querySelector('h1').style.cssText).toContain(goalBackground);
  });

  it('should hide incorrect choices', () => {
    compiled.querySelectorAll('.square')[3].click();
    fixture.detectChanges();

    expect(compiled.querySelectorAll('.square')[3].style.cssText).toContain('background: transparent');
    expect(compiled.querySelector('#message').textContent).toContain('Try Again');
  });

  it('should have a button to reset the game', () => {
    expect(compiled.querySelector('#reset').textContent).toContain('New Colors');

    compiled.querySelectorAll('.square')[5].click();
    fixture.detectChanges();

    expect(compiled.querySelector('#message').textContent).toContain('Correct!');
    expect(compiled.querySelector('#reset').textContent).toContain('Play Again?');

    compiled.querySelector('#reset').click();
    fixture.detectChanges();

    expect(compiled.querySelectorAll('.square')[0].style.cssText).toContain('rgb(199, 119, 9)');
    expect(compiled.querySelector('#message').textContent).toBe('');
    expect(compiled.querySelector('h1').textContent).toContain('The Great rgb(199, 119, 9) Color Game');
    expect(compiled.querySelector('h1').style.cssText).not.toContain(goalBackground);
  });

  it('should have an easy/hard toggle', () => {
    expect(compiled.querySelector('.mode.selected').textContent).toContain('Hard');
    expect(compiled.querySelector('.mode').textContent).toContain('Easy');

    compiled.querySelector('.mode').click();
    fixture.detectChanges();

    expect(app.colors.length).toBe(3);
    expect(compiled.querySelectorAll('.square')[3].style.cssText).not.toContain('rgb(199, 119, 9)');
    expect(compiled.querySelector('h1').textContent).toContain('The Great rgb(199, 119, 9) Color Game');
    expect(compiled.querySelector('.mode.selected').textContent).toContain('Easy');
  });
});
