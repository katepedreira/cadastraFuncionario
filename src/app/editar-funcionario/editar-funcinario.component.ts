import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FuncionarioService } from '../shared/funcionario.service';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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

interface IListFuncionario {
  id: string;
  nome: string;
  matricula: string;
  genero: string;
  sexo: string;
  nascimento: Date;
  cpf: string;
  departamento: string;
  cargo: string;
  salario: number;
}

@Component({
  selector: 'app-editar-funcionario',
  templateUrl: './editar-funcinario.component.html',
  styleUrls: ['./editar-funcinario.component.css']
})
export class EditarFuncinarioComponent implements OnInit {
  cargoNome: string = '';
  formEditarFuncionario!: FormGroup;
  departamentos: any[] = [];
  cargos: any[] = [];

  constructor(
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<EditarFuncinarioComponent>,
    private fb: FormBuilder,
    private funcionarioService: FuncionarioService,
    private datePipe: DatePipe,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) private data: IListFuncionario
  ) {}

  ngOnInit(): void {
    this.initForm();

    const funcionarioId: string = this.data.id;

    this.funcionarioService.getFuncionarioById(funcionarioId).subscribe(
      (funcionario) => {
        const dataOriginal = new Date(funcionario.nascimento);

        dataOriginal.setMinutes(dataOriginal.getMinutes() + dataOriginal.getTimezoneOffset());

        const dataFormatada = this.datePipe.transform(dataOriginal, 'yyyy-MM-dd');

        const departamento = departamentosBD.find(depto => depto.idDepto === funcionario.departamento);
        const departamentoId = departamento ? departamento.idDepto : '';
        const departamentoNome = departamento ? departamento.nome : '';
        const cargo = cargosBD.find(c => c.idCargo === funcionario.cargo);
        const cargoId = cargo ? cargo.idCargo : '';
        const cargoNome = cargo ? cargo.cargo : '';


        this.formEditarFuncionario.patchValue({
          matricula: funcionario.matricula,
          nome: funcionario.nome,
          sexo: funcionario.sexo,
          nascimento: dataFormatada,
          cpf: funcionario.cpf,
          departamento: departamentoId,
          cargo: cargoId,
          salario: funcionario.salario
        });

        console.log("DeptoService: " + departamento)
        console.log("CargoService: " + cargo)

        console.log("idDepto: " + departamentoId)
        console.log("nomeDepto: " + departamentoNome)
        console.log("idCargo: " + cargoId)
        console.log("nomeCargo: " + cargoNome)

        this.cargoNome = cargoNome;

      },
      (error) => {
        console.error('Erro ao obter funcionário para edição:', error);
      }
    );
  }

  initForm(): void {
    this.formEditarFuncionario = this.fb.group({
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
    this.departamentoChange({ target: { value: this.data.departamento } });
  }

  departamentoChange($event: any): void {
    const departamentoSelecionado = $event.target.value;
    this.cargos = cargosBD.filter(c => c.idDepto === departamentoSelecionado);

    this.formEditarFuncionario.get('cargo')?.setValue('');
    this.formEditarFuncionario.get('cargo')?.markAsUntouched();

    if (departamentoSelecionado !== '' && departamentoSelecionado !== 'Selecione o departamento:') {
      this.formEditarFuncionario.get('cargo')?.setValidators([Validators.required]);
    } else {
      this.formEditarFuncionario.get('cargo')?.clearValidators();
    }
    this.formEditarFuncionario.get('cargo')?.updateValueAndValidity();
  }


  fecharDialogo(): void {
    this.dialogRef.close();
    this.router.navigate(['listar-funcionarios']);
  }

salvarEdicao(): void {
  const cargoSelecionado = this.formEditarFuncionario.get('cargo')?.value;

  if (this.formEditarFuncionario.valid && cargoSelecionado && cargoSelecionado !== 'Selecione o cargo:') {
    const funcionarioData = { ...this.formEditarFuncionario.value, id: this.data.id };

    this.funcionarioService.editarFuncionario(funcionarioData).subscribe(
      (response) => {
        this.snackBar.open('Funcionário editado com sucesso!', 'Fechar', {
          duration: 5000,
        });
      },
      (error) => {
        this.snackBar.open('Erro ao editar funcionário. Por favor, tente novamente.', 'Fechar', {
          duration: 5000,
        });
      }
    );
  } else {
    this.snackBar.open('Selecione um cargo válido.', 'Fechar', {
      duration: 5000,
    });
  }
}
}

