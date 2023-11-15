import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListaFuncionariosComponent } from './lista-funcionarios/lista-funcionarios/lista-funcionarios.component';
import { EditarFuncionarioComponent } from './editar-funcionario/editar-funcionario/editar-funcionario.component';
import { VisualizarFuncionarioComponent } from './visualizar-funcionario/visualizar-funcionario/visualizar-funcionario.component';
import { IncluirFuncionarioComponent } from './incluir-funcionario/incluir-funcionario/incluir-funcionario.component';
import { PrincipalComponent } from './principal/principal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    VisualizarFuncionarioComponent,
    IncluirFuncionarioComponent,
    PrincipalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
