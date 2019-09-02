import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AddprojectComponent } from './addproject.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,HttpClientTestingModule,
        FormsModule , 
        ReactiveFormsModule
      ],
      declarations: [
        AddprojectComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AddprojectComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Project Manager'`, () => {
    const fixture = TestBed.createComponent(AddprojectComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual(undefined);
  });
 
});


