import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplorarRecetaComponent } from './explorar-receta.component';

describe('ExplorarRecetaComponent', () => {
  let component: ExplorarRecetaComponent;
  let fixture: ComponentFixture<ExplorarRecetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExplorarRecetaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExplorarRecetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
