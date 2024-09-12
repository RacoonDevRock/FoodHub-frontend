import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilCreadorComponent } from './perfil-creador.component';

describe('PerfilCreadorComponent', () => {
  let component: PerfilCreadorComponent;
  let fixture: ComponentFixture<PerfilCreadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilCreadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilCreadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
