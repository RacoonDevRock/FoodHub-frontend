import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBody2Component } from './card-body2.component';

describe('CardBody2Component', () => {
  let component: CardBody2Component;
  let fixture: ComponentFixture<CardBody2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardBody2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardBody2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
