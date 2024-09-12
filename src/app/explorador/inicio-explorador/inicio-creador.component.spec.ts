import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioCreadorComponent } from './inicio-creador.component';

describe('InicioCreadorComponent', () => {
  let component: InicioCreadorComponent;
  let fixture: ComponentFixture<InicioCreadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicioCreadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioCreadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
