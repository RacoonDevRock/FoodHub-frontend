import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideCategoriasComponent } from './side-categorias.component';

describe('SideCategoriasComponent', () => {
  let component: SideCategoriasComponent;
  let fixture: ComponentFixture<SideCategoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideCategoriasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
