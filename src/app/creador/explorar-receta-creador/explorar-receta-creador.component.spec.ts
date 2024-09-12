import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplorarRecetaCreadorComponent } from './explorar-receta-creador.component';

describe('ExplorarRecetaCreadorComponent', () => {
  let component: ExplorarRecetaCreadorComponent;
  let fixture: ComponentFixture<ExplorarRecetaCreadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExplorarRecetaCreadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExplorarRecetaCreadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
