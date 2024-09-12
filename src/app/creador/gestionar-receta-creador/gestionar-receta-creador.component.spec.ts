import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarRecetaCreadorComponent } from './gestionar-receta-creador.component';

describe('GestionarRecetaCreadorComponent', () => {
  let component: GestionarRecetaCreadorComponent;
  let fixture: ComponentFixture<GestionarRecetaCreadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionarRecetaCreadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionarRecetaCreadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
