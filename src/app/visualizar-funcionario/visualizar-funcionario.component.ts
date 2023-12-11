import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-visualizar-funcionario',
  templateUrl: './visualizar-funcionario.component.html',
  styleUrls: ['./visualizar-funcionario.component.css']
})
export class VisualizarFuncionarioComponent {

  constructor(
    public dialogRef: MatDialogRef<VisualizarFuncionarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  fecharDialog(): void {
    this.dialogRef.close();
  }

}
