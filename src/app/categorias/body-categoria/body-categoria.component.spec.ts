import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyCategoriaComponent } from './body-categoria.component';

describe('BodyCategoriaComponent', () => {
  let component: BodyCategoriaComponent;
  let fixture: ComponentFixture<BodyCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BodyCategoriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BodyCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
