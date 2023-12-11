// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { FuncionarioService } from '../shared/funcionario.service';
// import { MatSnackBar } from '@angular/material/snack-bar';


// export const departamentosBD = [
//   {
//     idDepto: '1',
//     nome: 'Tecnologia da Informação'
//   },
//   {
//     idDepto: '2',
//     nome: 'Jurídico'
//   },
//   {
//     idDepto: '3',
//     nome: 'Marketing'
//   },
//   {
//     idDepto: '4',
//     nome: 'Recursos Humanos'
//   },
//   {
//     idDepto: '5',
//     nome: 'Financeiro'
//   },
// ]

// export const cargosBD = [
//   {
//     idCargo: '1',
//     idDepto: '1',
//     cargo: 'Desenvolvedor'
//   },
//   {
//     idCargo: '2',
//     idDepto: '1',
//     cargo: 'Analista de Sistemas'
//   },
//   {
//     idCargo: '3',
//     idDepto: '1',
//     cargo: 'Administrador de Redes'
//   },
//   {
//     idCargo: '4',
//     idDepto: '2',
//     cargo: 'Advogado'
//   },
//   {
//     idCargo: '5',
//     idDepto: '2',
//     cargo: 'Estagiário Jurídico'
//   },
//   {
//     idCargo: '6',
//     idDepto: '3',
//     cargo: 'Especialista em Marketing'
//   },
//   {
//     idCargo: '7',
//     idDepto: '3',
//     cargo: 'Assistente de Marketing'
//   },
//   {
//     idCargo: '8',
//     idDepto: '4',
//     cargo: 'Gerente de Recursos Humanos'
//   },
//   {
//     idCargo: '9',
//     idDepto: '4',
//     cargo: 'Analista de RH'
//   },
//   {
//     idCargo: '10',
//     idDepto: '5',
//     cargo: 'Controller'
//   },
//   {
//     idCargo: '11',
//     idDepto: '5',
//     cargo: 'Contador'
//   },
//   {
//     idCargo: '12',
//     idDepto: '5',
//     cargo: 'Analista Financeiro'
//   }
// ]

// @Component({
//   selector: 'app-incluir-funcionario',
//   templateUrl: './incluir-funcionario.component.html',
//   styleUrls: ['./incluir-funcionario.component.css']
// })
// export class IncluirFuncionarioComponent implements OnInit {

//   matriculaLenghtError: boolean = false;
//   matriculaEmptyError: boolean = false;
//   nomeLengthError: boolean = false;
//   cpfLenghtError: boolean = false;
//   cpfEmptyError: boolean = false;
//   sexoError: boolean = false;
//   nascimentoError: boolean = false;
//   departamentoError: boolean = false;
//   cargoError: boolean = false;
//   salarioError: boolean = false;

//   formInserirFuncionario!: FormGroup;
//    departamentos:any[] = [];
//   cargos:any[] = [];

//   constructor(private fb: FormBuilder, private funcionarioService: FuncionarioService, private snackBar: MatSnackBar) {}

//   ngOnInit(): void {
//     this.initForm();
//   }

//   initForm(): void {
//     this.formInserirFuncionario = this.fb.group({
//       matricula: ['', [Validators.required, Validators.maxLength(8)]],
//       nome: ['', Validators.required],
//       sexo: ['', Validators.required],
//       nascimento: ['', Validators.required],
//       cpf: ['', [Validators.required, Validators.maxLength(11)]],
//       departamento: ['', Validators.required],
//       cargo: ['', Validators.required],
//       salario: ['', Validators.required]
//     });

//     this.departamentos = departamentosBD;

//   }

//   departamentoChange($event: any) {
//     this.cargos = cargosBD.filter(c=>c.idDepto===$event.target.value);
//   }

// salvarFuncionario(): void {
//   // Limpar erros anteriores
//   this.matriculaLenghtError = false;
//   this.matriculaEmptyError = false;
//   this.nomeLengthError = false;
//   this.cpfLenghtError = false;
//   this.cpfEmptyError = false;
//   this.sexoError = false;
//   this.nascimentoError = false;
//   this.departamentoError = false;
//   this.cargoError = false;
//   this.salarioError = false;

//   if (this.formInserirFuncionario.valid) {
//     const funcionarioData = this.formInserirFuncionario.value;

//     if (!funcionarioData.matricula) {
//       this.matriculaEmptyError = true;
//     } else if (funcionarioData.matricula.length !== 8) {
//       this.matriculaLenghtError = true;
//     }

//     if (!funcionarioData.nome) {
//       this.nomeLengthError = true;
//     }

//     if (!funcionarioData.cpf) {
//       this.cpfEmptyError = true;
//     } else if (funcionarioData.cpf.length !== 11) {
//       this.cpfLenghtError = true;
//     }

//     if (!funcionarioData.sexo) {
//       this.sexoError = true;
//     }

//     if (!funcionarioData.nascimento) {
//       this.nascimentoError = true;
//     }

//     if (!funcionarioData.departamento) {
//       this.departamentoError = true;
//     }

//     if (!funcionarioData.cargo) {
//       this.cargoError = true;
//     }

//     if (!funcionarioData.salario) {
//       this.salarioError = true;
//     }

//     if (
//       this.matriculaEmptyError ||
//       this.matriculaLenghtError ||
//       this.nomeLengthError ||
//       this.cpfEmptyError ||
//       this.sexoError ||
//       this.nascimentoError ||
//       this.departamentoError ||
//       this.cargoError ||
//       this.salarioError ||
//       this.cpfLenghtError
//     ) {
//       let errorMessage = 'Preencha todos os campos obrigatórios.';
//       if (this.cpfLenghtError) {
//         errorMessage = 'CPF deve ter 11 dígitos.';
//       } else if (this.matriculaLenghtError) {
//         errorMessage = 'Matrícula deve ter 8 dígitos.';
//       } else if (this.nomeLengthError) {
//         errorMessage = 'Nome não pode estar em branco.';
//       }

//       this.snackBar.open(errorMessage, 'Fechar', {
//         duration: 5000,
//       });
//       return;
//     }

//     this.funcionarioService.incluirFuncionario(funcionarioData).subscribe(
//       (response) => {
//         this.snackBar.open('Funcionário salvo com sucesso!', 'Fechar', {
//           duration: 5000,
//         });
//       },
//       (error) => {
//         this.snackBar.open('Erro ao salvar funcionário. Por favor, tente novamente.', 'Fechar', {
//           duration: 5000,
//         });
//       }
//     );
//   }
// }
// }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuncionarioService } from '../shared/funcionario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';

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
  matriculaLengthError: boolean = false;
  matriculaEmptyError: boolean = false;
  nomeLengthError: boolean = false;
  cpfLengthError: boolean = false;
  cpfEmptyError: boolean = false;
  sexoError: boolean = false;
  nascimentoError: boolean = false;
  departamentoError: boolean = false;
  cargoError: boolean = false;
  salarioError: boolean = false;

  formInserirFuncionario!: FormGroup;
  departamentos: any[] = [];
  cargos: any[] = [];

  constructor(private fb: FormBuilder, private funcionarioService: FuncionarioService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.formInserirFuncionario = this.fb.group({
      matricula: ['', [Validators.required, Validators.maxLength(8)]],
      nome: ['', Validators.required],
      sexo: ['', Validators.required],
      nascimento: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.maxLength(11)]],
      departamento: ['', Validators.required],
      cargo: ['', Validators.required],
      salario: ['', Validators.required]
    });

    this.departamentos = departamentosBD;
  }

  departamentoChange($event: any) {
    this.cargos = cargosBD.filter(c => c.idDepto === $event.target.value);
  }

  salvarFuncionario(): void {
    this.matriculaLengthError = false;
    this.matriculaEmptyError = false;
    this.nomeLengthError = false;
    this.cpfLengthError = false;
    this.cpfEmptyError = false;
    this.sexoError = false;
    this.nascimentoError = false;
    this.departamentoError = false;
    this.cargoError = false;
    this.salarioError = false;

    if (this.formInserirFuncionario.valid) {
      const funcionarioData = this.formInserirFuncionario.value;

      if (!funcionarioData.matricula) {
        this.matriculaEmptyError = true;
      } else if (funcionarioData.matricula.length !== 8) {
        this.matriculaLengthError = true;
      }

      if (!funcionarioData.nome) {
        this.nomeLengthError = true;
      }

      if (!funcionarioData.cpf) {
        this.cpfEmptyError = true;
      } else if (funcionarioData.cpf.length !== 11) {
        this.cpfLengthError = true;
      }

      if (!funcionarioData.sexo) {
        this.sexoError = true;
      }

      if (!funcionarioData.nascimento) {
        this.nascimentoError = true;
      }

      if (!funcionarioData.departamento) {
        this.departamentoError = true;
      }

      if (!funcionarioData.cargo) {
        this.cargoError = true;
      }

      if (!funcionarioData.salario) {
        this.salarioError = true;
      }

      if (
        this.matriculaEmptyError ||
        this.matriculaLengthError ||
        this.nomeLengthError ||
        this.cpfEmptyError ||
        this.sexoError ||
        this.nascimentoError ||
        this.departamentoError ||
        this.cargoError ||
        this.salarioError ||
        this.cpfLengthError
      ) {
        let errorMessage = 'Preencha todos os campos obrigatórios.';
        if (this.cpfLengthError) {
          errorMessage = 'CPF deve ter 11 dígitos.';
        } else if (this.matriculaLengthError) {
          errorMessage = 'Matrícula deve ter 8 dígitos.';
        } else if (this.nomeLengthError) {
          errorMessage = 'Nome não pode estar em branco.';
        }

        this.snackBar.open(errorMessage, 'Fechar', {
          duration: 5000,
        });
        return;
      }

      this.funcionarioService.incluirFuncionario(funcionarioData).subscribe(
        (response) => {
          this.snackBar.open('Funcionário salvo com sucesso!', 'Fechar', {
            duration: 5000,
          });
        },
        (error) => {
          this.snackBar.open('Erro ao salvar funcionário. Por favor, tente novamente.', 'Fechar', {
            duration: 5000,
          });
        }
      );
    }
  }
}
