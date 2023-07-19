import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeshboardComponent } from './deshboard.component';

describe('DeshboardComponent', () => {
  let component: DeshboardComponent;
  let fixture: ComponentFixture<DeshboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeshboardComponent]
    });
    fixture = TestBed.createComponent(DeshboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
