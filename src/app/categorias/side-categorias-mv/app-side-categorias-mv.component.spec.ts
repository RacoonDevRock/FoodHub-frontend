import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSideCategoriasMvComponent } from './app-side-categorias-mv.component';

describe('AppSideCategoriasMvComponent', () => {
  let component: AppSideCategoriasMvComponent;
  let fixture: ComponentFixture<AppSideCategoriasMvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppSideCategoriasMvComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppSideCategoriasMvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
