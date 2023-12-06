import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarFuncinarioComponent } from './editar-funcinario.component';

describe('EditarFuncinarioComponent', () => {
  let component: EditarFuncinarioComponent;
  let fixture: ComponentFixture<EditarFuncinarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarFuncinarioComponent]
    });
    fixture = TestBed.createComponent(EditarFuncinarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
