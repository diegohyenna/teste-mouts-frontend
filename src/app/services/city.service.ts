import { RepositoryService } from './repository.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CityService extends RepositoryService {
  constructor() {
    super();
  }

  getCities() {
    return this.get(
      this.baseUrl + 'cidades',
      'Não foi possível carregar as cidades'
    );
  }

  getCity(id: string) {
    return this.get(
      this.baseUrl + 'cidades/' + id,
      'Não foi possível carregar a cidade'
    );
  }

  getCityByName(name: string) {
    return this.post(
      this.baseUrl + 'cidade-por-nome/',
      'Não foi possível carregar a cidade',
      {
        nome: name,
      }
    );
  }

  createCity(name: string, uf: string, mayor: string, population: number) {
    return this.post(
      this.baseUrl + 'cidades',
      'Não foi possível salvar a cidade',
      {
        nome: name,
        uf,
        prefeito: mayor,
        populacao: population,
      }
    );
  }

  updateCity(
    id: string,
    name: string,
    uf: string,
    mayor: string,
    population: number
  ) {
    return this.put(
      this.baseUrl + 'cidades/' + id,
      'Não foi possível alterar a cidade',
      {
        nome: name,
        uf,
        prefeito: mayor,
        populacao: population,
      }
    );
  }

  deleteCity(id: string) {
    return this.delete(
      this.baseUrl + 'cidades/' + id,
      'Não foi possível deletar a cidade'
    );
  }
}
