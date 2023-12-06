import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuncionarioService } from '../shared/funcionario.service';

export const departamentosBD = [
  {
    idDepto: '1',
    nome: 'Tecnologia da Informação'
  },
  {
    idDepto: '2',
    nome: 'Jurídico'
  },
  {
    idDepto: '3',
    nome: 'Marketing'
  },
  {
    idDepto: '4',
    nome: 'Recursos Humanos'
  },
  {
    idDepto: '5',
    nome: 'Financeiro'
  },
]

export const cargosBD = [
  {
    idCargo: '1',
    idDepto: '1',
    cargo: 'Desenvolvedor'
  },
  {
    idCargo: '2',
    idDepto: '1',
    cargo: 'Analista de Sistemas'
  },
  {
    idCargo: '3',
    idDepto: '1',
    cargo: 'Administrador de Redes'
  },
  {
    idCargo: '4',
    idDepto: '2',
    cargo: 'Advogado'
  },
  {
    idCargo: '5',
    idDepto: '2',
    cargo: 'Estagiário Jurídico'
  },
  {
    idCargo: '6',
    idDepto: '3',
    cargo: 'Especialista em Marketing'
  },
  {
    idCargo: '7',
    idDepto: '3',
    cargo: 'Assistente de Marketing'
  },
  {
    idCargo: '8',
    idDepto: '4',
    cargo: 'Gerente de Recursos Humanos'
  },
  {
    idCargo: '9',
    idDepto: '4',
    cargo: 'Analista de RH'
  },
  {
    idCargo: '10',
    idDepto: '5',
    cargo: 'Controller'
  },
  {
    idCargo: '11',
    idDepto: '5',
    cargo: 'Contador'
  },
  {
    idCargo: '12',
    idDepto: '5',
    cargo: 'Analista Financeiro'
  }
]

@Component({
  selector: 'app-incluir-funcionario',
  templateUrl: './incluir-funcionario.component.html',
  styleUrls: ['./incluir-funcionario.component.css']
})
export class IncluirFuncionarioComponent implements OnInit {

  formInserirFuncionario!: FormGroup;
   departamentos:any[] = [];
  cargos:any[] = [];

  constructor(private fb: FormBuilder, private funcionarioService: FuncionarioService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.formInserirFuncionario = this.fb.group({
      matricula: ['', [Validators.required, Validators.maxLength(8)]],
      nome: ['', Validators.required],
      sexo: ['', Validators.required],
      nascimento: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.maxLength(14)]],
      departamento: ['', Validators.required],
      cargo: ['', Validators.required],
      salario: ['', Validators.required]
    });

    this.departamentos = departamentosBD;

  }

  departamentoChange($event: any) {
    this.cargos = cargosBD.filter(c=>c.idDepto===$event.target.value);
  }



  salvarFuncionario(): void {
    if (this.formInserirFuncionario.valid) {
      const funcionarioData = this.formInserirFuncionario.value;

      this.funcionarioService.incluirFuncionario(funcionarioData).subscribe(
        (response) => {
          console.log('Funcionário salvo com sucesso:', response);
        },
        (error) => {
          console.error('Erro ao salvar funcionário:', error);
        }
      );
    }
  }
}


