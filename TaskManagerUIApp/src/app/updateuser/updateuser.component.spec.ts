import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UpdateuserComponent } from './updateuser.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule , HttpClientXsrfModule} from '@angular/common/http';

import { RouterModule } from '@angular/router';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,HttpClientTestingModule,
        FormsModule , 
        ReactiveFormsModule,
        BrowserModule,HttpClientModule,RouterModule
      ],
      declarations: [
        UpdateuserComponent,
        ],
    }).compileComponents();
  }));

  it('should create the Update user Component', () => {
    const fixture = TestBed.createComponent(UpdateuserComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should  not have as title 'Project Manager'`, () => {
    const fixture = TestBed.createComponent(UpdateuserComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual(undefined);
  });
 
});





