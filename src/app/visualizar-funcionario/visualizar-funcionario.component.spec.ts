import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarFuncionarioComponent } from './visualizar-funcionario.component';

describe('VisualizarFuncionarioComponent', () => {
  let component: VisualizarFuncionarioComponent;
  let fixture: ComponentFixture<VisualizarFuncionarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisualizarFuncionarioComponent]
    });
    fixture = TestBed.createComponent(VisualizarFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
