import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  private url = 'https://localhost:8080/funcionario';

  constructor(private http: HttpClient) {}

  listarFuncionarios(): Observable<any> {
    return this.http.get(`${this.url}/list`);
  }

  incluirFuncionarioById(): Observable<any> {
    return this.http.get(`${this.url}/create`);
  }

  editarFuncionarioById(): Observable<any> {
    return this.http.get(`${this.url}/edit`);
  }

  removerFuncionarioById(): Observable<any> {
    return this.http.get(`${this.url}/remove/{id}`);
  }


}


