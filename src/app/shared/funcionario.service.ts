import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { IListFuncionario } from '../listar-funcionarios/listar-funcionarios.component';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  private url = 'http://localhost:8080/api/funcionario';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + btoa('kate:12345')
    })
  };

  private funcionariosSubject = new BehaviorSubject<IListFuncionario[]>([]);

  constructor(private http: HttpClient) {}

  listarFuncionarios(params?: any): Observable<any> {
    const options = { params: new HttpParams({ fromObject: params }) };
    return this.http.get(`${this.url}/list`, this.httpOptions)
      .pipe(
        map((response: any) => {
          const funcionarios = response as IListFuncionario[];
          this.funcionariosSubject.next(funcionarios);
          return funcionarios;
        })
      );
  }


  getFuncionariosSubject(): Observable<IListFuncionario[]> {
    return this.funcionariosSubject.asObservable();
  }

  incluirFuncionario(funcionarioData: any): Observable<any> {
    return this.http.post(`${this.url}/create`, funcionarioData, this.httpOptions);
  }

  editarFuncionario(funcionarioData: any): Observable<any> {
    return this.http.put(`${this.url}/edit`, funcionarioData, this.httpOptions);
  }

  removerFuncionario(id: string): Observable<any> {
    return this.http.delete(`${this.url}/remove/${id}`, this.httpOptions);
  }

  getFuncionarioById(id: string): Observable<any> {
    return this.http.get(`${this.url}/getById/${id}`, this.httpOptions);
  }
}




