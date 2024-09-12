import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderCreadorComponent } from './header-creador.component';

describe('HeaderCreadorComponent', () => {
  let component: HeaderCreadorComponent;
  let fixture: ComponentFixture<HeaderCreadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderCreadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderCreadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
