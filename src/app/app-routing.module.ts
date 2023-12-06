import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { IncluirFuncionarioComponent } from './incluir-funcionario/incluir-funcionario.component';
import { ListarFuncionariosComponent } from './listar-funcionarios/listar-funcionarios.component';
import { EditarFuncinarioComponent } from './editar-funcionario/editar-funcinario.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "home", component: HomeComponent},
  {path: "incluir-funcionario", component: IncluirFuncionarioComponent},
  {path: "editar-funcionario", component: EditarFuncinarioComponent},
  {path: "listar-funcionarios", component: ListarFuncionariosComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
