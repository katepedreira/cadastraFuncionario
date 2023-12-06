import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarFuncionarioComponent } from './editar-funcinario.component';

describe('EditarFuncinarioComponent', () => {
  let component: EditarFuncionarioComponent;
  let fixture: ComponentFixture<EditarFuncionarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarFuncionarioComponent]
    });
    fixture = TestBed.createComponent(EditarFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
