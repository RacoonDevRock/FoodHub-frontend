import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderExploradorComponent } from './header-explorador.component';

describe('HeaderExploradorComponent', () => {
  let component: HeaderExploradorComponent;
  let fixture: ComponentFixture<HeaderExploradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderExploradorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderExploradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
