import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuizeComponent } from './add-quize.component';

describe('AddQuizeComponent', () => {
  let component: AddQuizeComponent;
  let fixture: ComponentFixture<AddQuizeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddQuizeComponent]
    });
    fixture = TestBed.createComponent(AddQuizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
