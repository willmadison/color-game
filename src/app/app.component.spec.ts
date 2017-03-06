import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture;
  let app;
  let compiled;

  beforeEach(async(() => {
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
    expect(compiled.querySelector('h1').textContent).toContain('The Great rgb(0, 255, 255) Color Game');
  }));

  it('should display different colors for each of the squares', async(() => {
    // app.colors = [
    //   'rgb(255, 0, 0)',
    //   'rgb(255, 255, 0)',
    //   'rgb(0, 255, 0)',
    //   'rgb(0, 255, 255)',
    //   'rgb(0, 0, 255)',
    //   'rgb(255, 0, 255)'
    // ];
    //
    // fixture.detectChanges();
    expect(compiled.querySelectorAll('.square')[5].style.cssText).toContain('rgb(255, 0, 255)');
  }));
});
