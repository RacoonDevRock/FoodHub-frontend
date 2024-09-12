import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearRecetaCreadorComponent } from './crear-receta-creador.component';

describe('CrearRecetaCreadorComponent', () => {
  let component: CrearRecetaCreadorComponent;
  let fixture: ComponentFixture<CrearRecetaCreadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearRecetaCreadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearRecetaCreadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
