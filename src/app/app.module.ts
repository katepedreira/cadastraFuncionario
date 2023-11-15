import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { VisualizarFuncionarioComponent } from './visualizar-funcionario/visualizar-funcionario.component';
import { IncluirFuncionarioComponent } from './incluir-funcionario/incluir-funcionario.component';
import { EditarFuncinarioComponent } from './editar-funcinario/editar-funcinario.component';
import { ListarFuncionariosComponent } from './listar-funcionario/listar-funcionarios.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    VisualizarFuncionarioComponent,
    IncluirFuncionarioComponent,
    EditarFuncinarioComponent,
    ListarFuncionariosComponent
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
