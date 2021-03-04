import { RepositoryService } from './repository.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UfService extends RepositoryService {
  constructor() {
    super();
  }

  getUfs() {
    return this.get(
      this.baseUrl + 'estados',
      'Não foi possível carregar os prefeitos'
    );
  }

  getUf(id: string) {
    return this.get(
      this.baseUrl + 'estados/' + id,
      'Não foi possível carregar o prefeito'
    );
  }

  getUfByName(name: string) {
    return this.post(
      this.baseUrl + 'estado-por-nome/',
      'Não foi possível carregar o prefeito',
      {
        nome: name,
      }
    );
  }

  createUf(name: string, sigla: string) {
    return this.post(
      this.baseUrl + 'estados',
      'Não foi possível salvar o estado',
      {
        nome: name,
        sigla,
      }
    );
  }

  updateUf(id: string, name: string, sigla: string) {
    return this.put(
      this.baseUrl + 'estados/' + id,
      'Não foi possível alterar o estado',
      {
        nome: name,
        sigla: sigla,
      }
    );
  }

  deleteUf(id: string) {
    return this.delete(
      this.baseUrl + 'estados/' + id,
      'Não foi possível deletar o estado'
    );
  }
}
