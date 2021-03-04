import { RepositoryService } from './repository.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MayorService extends RepositoryService {
  constructor() {
    super();
  }

  getMayors() {
    return this.get(
      this.baseUrl + 'prefeitos',
      'Não foi possível carregar os prefeitos'
    );
  }

  getMayor(id: string) {
    return this.get(
      this.baseUrl + 'prefeitos/' + id,
      'Não foi possível carregar o prefeito'
    );
  }

  getMayorByName(name: string) {
    return this.post(
      this.baseUrl + 'prefeito-por-nome/',
      'Não foi possível carregar o prefeito',
      {
        nome: name,
      }
    );
  }

  createMayor(name: string) {
    return this.post(
      this.baseUrl + 'prefeitos',
      'Não foi possível salvar o prefeito',
      {
        nome: name,
      }
    );
  }

  updateMayor(id: string, name: string) {
    return this.put(
      this.baseUrl + 'prefeitos/' + id,
      'Não foi possível alterar o prefeito',
      {
        nome: name,
      }
    );
  }

  deleteMayor(id: string) {
    return this.delete(
      this.baseUrl + 'prefeitos/' + id,
      'Não foi possível deletar o prefeito'
    );
  }
}
