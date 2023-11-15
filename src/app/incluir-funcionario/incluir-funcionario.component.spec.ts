import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncluirFuncionarioComponent } from './incluir-funcionario.component';

describe('IncluirFuncionarioComponent', () => {
  let component: IncluirFuncionarioComponent;
  let fixture: ComponentFixture<IncluirFuncionarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IncluirFuncionarioComponent]
    });
    fixture = TestBed.createComponent(IncluirFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
