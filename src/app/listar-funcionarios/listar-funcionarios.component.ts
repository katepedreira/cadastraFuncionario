import { Component, ViewChild, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FuncionarioService } from '../shared/funcionario.service';
import { MatDialog } from '@angular/material/dialog';
import { VisualizarFuncionarioComponent } from '../visualizar-funcionario/visualizar-funcionario.component';
import { EditarFuncinarioComponent } from '../editar-funcionario/editar-funcinario.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IncluirFuncionarioComponent } from '../incluir-funcionario/incluir-funcionario.component';
import { FormGroup } from '@angular/forms';

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

export interface IListFuncionario {
  id: number;
  nome: string;
  matricula: string;
  genero: string;
  sexo: string;
  nascimento: Date;
  cpf: string;
  departamento: string;
  cargo: string;
  salario: number
}

@Component({
  selector: 'app-listar-funcionarios',
  templateUrl: './listar-funcionarios.component.html',
  styleUrls: ['./listar-funcionarios.component.css']
})
export class ListarFuncionariosComponent implements AfterViewInit {
  @Output() tableHeightChanged = new EventEmitter<number>();
  formInserirFuncionario!: FormGroup;

  displayedColumns: string[] = ['nome', 'matricula', 'acoes'];
  dataSource: MatTableDataSource<IListFuncionario> = new MatTableDataSource<IListFuncionario>([]);
  pageSize: number = 10;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(
    private funcionarioService: FuncionarioService,
    public dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar

  ) {}

  ngAfterViewInit() {
    this.listarFuncionarios();
  }

  listarFuncionarios(): void {
    this.funcionarioService.listarFuncionarios().subscribe((funcionarios: IListFuncionario[]) => {
      console.log('Dados recebidos:', funcionarios);
      this.dataSource.data = funcionarios;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  removerFuncionario(funcionario: IListFuncionario): void {
    const funcionarioId = funcionario.id.toString();
    this.funcionarioService.removerFuncionario(funcionarioId).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((a) => a.id.toString() !== funcionarioId);
    });
  }

  visualizarFuncionario(funcionario: IListFuncionario): void {
    const dialogRef = this.dialog.open(VisualizarFuncionarioComponent, {
      width: '400px',
      data: funcionario
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }


  editarFuncionario(funcionario: IListFuncionario): void {

    const dialogRef = this.dialog.open(EditarFuncinarioComponent, {
      width: '400px',
      data: funcionario
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listarFuncionarios();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  incluirFuncionario(): void {
    const dialogRef = this.dialog.open(IncluirFuncionarioComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate(['/listar-funcionarios']);
      }
      this.listarFuncionarios();
    });
  }

//   salvarFuncionario(): void {
//     if (this.formInserirFuncionario.valid) {
//       const funcionarioData = this.formInserirFuncionario.value;

//       this.funcionarioService.incluirFuncionario(funcionarioData).subscribe(
//         (response) => {
//           this.snackBar.open('Funcionário salvo com sucesso!', 'Fechar', {
//             duration: 5000,
//           });
//         },

//       (error) => {
//         this.snackBar.open('Erro ao salvar funcionário. Por favor, tente novamente.', 'Fechar', {
//           duration: 5000,
//         });
//       }
//     );
//   }
// }

}
