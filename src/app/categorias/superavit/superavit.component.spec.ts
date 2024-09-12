import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperavitComponent } from './superavit.component';

describe('SuperavitComponent', () => {
  let component: SuperavitComponent;
  let fixture: ComponentFixture<SuperavitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperavitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperavitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
