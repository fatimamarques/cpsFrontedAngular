import { ClientesService } from './../../../services/clientes.service';
import { ICliente } from './../../../model/ICliente.model';
import { Component, OnInit } from '@angular/core';
import { applySourceSpanToStatementIfNeeded } from '@angular/compiler/src/output/output_ast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar-cliente',
  templateUrl: './cadastrar-cliente.component.html',
  styleUrls: ['./cadastrar-cliente.component.css'],
})
export class CadastrarClienteComponent implements OnInit {

  cliente: ICliente = {
    nome: null,
    dtNasc: null,
    email: null
  }

  constructor(private clientesService: ClientesService, private router:Router) {}

  ngOnInit(): void {}

  salvarCliente():void{
    this.clientesService.cadastrar(this.cliente).subscribe(retorno => {
      this.cliente = retorno;
      this.clientesService.exibirMensagem(
        'SISTEMA',
        `${this.cliente.nome} foi cadastrado com sucesso. ID: ${this.cliente.id}`,
        'toast-success'
      );
      this.router.navigate(['/clientes']);
    });

  }
}
