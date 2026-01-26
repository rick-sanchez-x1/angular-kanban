import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, BrowserAnimationsModule],
      providers: [MessageService],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have initial count as 0', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.count).toEqual(0);
  });

  it('should increment count', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.increment();
    expect(app.count).toEqual(1);
  });

  it('should not decrement count below 0', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.decrement();
    expect(app.count).toEqual(0);
  });

  it('should call messageService on decrement when count is 0', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const messageService = TestBed.inject(MessageService);
    const spy = spyOn(messageService, 'add');

    app.decrement();

    expect(spy).toHaveBeenCalledWith(
      jasmine.objectContaining({
        severity: 'warn',
        detail: 'Count cannot go below 0',
      }),
    );
  });

  it('should reset count', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.increment();
    app.reset();
    expect(app.count).toEqual(0);
  });

  it('should render counter title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Minimal Counter',
    );
  });
});