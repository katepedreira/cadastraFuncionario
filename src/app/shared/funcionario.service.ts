import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  constructor(private http: HttpClient) {}

  listarFuncionarios(params?: any): Observable<any> {
    const options = { params: new HttpParams({ fromObject: params }) };
    return this.http.get(`${this.url}/list`, this.httpOptions);
  }

  incluirFuncionario(funcionarioData: any): Observable<any> {
    return this.http.post(`${this.url}/create`, funcionarioData, this.httpOptions);
  }

  editarFuncionario(id: string, funcionarioData: any): Observable<any> {
    return this.http.put(`${this.url}/edit/${id}`, funcionarioData, this.httpOptions);
  }

  removerFuncionario(id: string): Observable<any> {
    return this.http.delete(`${this.url}/remove/${id}`, this.httpOptions);
  }


  
}