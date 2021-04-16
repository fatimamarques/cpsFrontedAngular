import { environment } from './../../environments/environment';
//import { Injectable } from '@angular/core';
import { ICliente } from './../model/ICliente.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  private URL: string = environment.URL1;

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  buscarTodos(): Observable<ICliente[]> {
    return this.http.get<ICliente[]>(this.URL).pipe(
      map((retorno) => retorno),
      catchError((erro) => this.exibeErro(erro))
    );
  }

  buscarPorId(id: number): Observable<ICliente> {
    return this.http.get<ICliente>(`${this.URL}/${id}`).pipe(
      map((retorno) => retorno),
      catchError((erro) => this.exibeErro(erro))
    );
  }

  cadastrar(cliente: ICliente): Observable<ICliente> {
    return this.http.post<ICliente>(this.URL, cliente).pipe(
      map((retorno) => retorno),
      catchError((erro) => this.exibeErro(erro))
    );
  }

  atualizar(cliente: ICliente): Observable<ICliente> {
    return this.http.put<ICliente>(`${this.URL}/${cliente.id}`, cliente).pipe(
      map((retorno) => retorno),
      catchError((erro) => this.exibeErro(erro))
    );
  }

  excluir(id: number): Observable<any> {
    return this.http.delete<any>(`${this.URL}/${id}`).pipe(
      map((retorno) => retorno),
      catchError((erro) => this.exibeErro(erro))
    );
  }

  exibeErro(e: any): Observable<any> {
    this.exibirMensagem(
      'ERRO!!!',
      'Não foi possivel realizar a operação',
      'toast-error'
    );
    return EMPTY;
  }

  exibirMensagem(titulo: string, mensagem: string, tipo: string): void {
    this.toastr.show(
      mensagem,
      titulo,
      { closeButton: true, progressBar: true },
      tipo
    );
  }
}
