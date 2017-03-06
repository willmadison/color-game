import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture;
  let app;
  let compiled;

  beforeEach(async(() => {
    spyOn(Math, 'random').and.returnValue(0.9441226570562253);

    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    app = fixture.debugElement.componentInstance;
    compiled = fixture.debugElement.nativeElement;
  }));

  it('should create the app', async(() => {
    expect(app).toBeTruthy();
    expect(compiled).toBeTruthy();
  }));

  it('should display the title', async(() => {
    expect(compiled.querySelector('h1').textContent).toContain('The Great rgb(255, 0, 255) Color Game');
  }));

  it('should display different colors for each of the squares', async(() => {
    expect(compiled.querySelectorAll('.square')[5].style.cssText).toContain('background: rgb(255, 0, 255)');
  }));

  it('should display correct message when user clicks on correct square', async(() => {
    compiled.querySelectorAll('.square')[5].click();
    fixture.detectChanges();

    expect(compiled.querySelector('#message').textContent).toContain('Correct!');

    for (let square of compiled.querySelectorAll('.square')) {
      expect(square.style.cssText).toContain('background: rgb(255, 0, 255)');
    }
  }));

  it('should hide incorrect choices', async(() => {
    compiled.querySelectorAll('.square')[3].click();
    fixture.detectChanges();

    expect(compiled.querySelectorAll('.square')[3].style.cssText).toContain('background: transparent');
    expect(compiled.querySelector('#message').textContent).toContain('Try Again');
  }));
});
