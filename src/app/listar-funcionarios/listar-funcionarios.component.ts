import { Component, ViewChild, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FuncionarioService } from '../shared/funcionario.service';
import { MatDialog } from '@angular/material/dialog';
import { VisualizarFuncionarioComponent } from '../visualizar-funcionario/visualizar-funcionario.component';
import { EditarFuncinarioComponent } from '../editar-funcionario/editar-funcinario.component';

export interface IListFuncionario {
  id: number;
  nome: string;
  matricula: string;
}

@Component({
  selector: 'app-listar-funcionarios',
  templateUrl: './listar-funcionarios.component.html',
  styleUrls: ['./listar-funcionarios.component.css']
})
export class ListarFuncionariosComponent implements AfterViewInit {
  @Output() tableHeightChanged = new EventEmitter<number>();

  displayedColumns: string[] = ['nome', 'matricula', 'acoes'];
  dataSource: MatTableDataSource<IListFuncionario> = new MatTableDataSource<IListFuncionario>([]);
  pageSize: number = 10;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(
    private funcionarioService: FuncionarioService,
    public dialog: MatDialog
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
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
