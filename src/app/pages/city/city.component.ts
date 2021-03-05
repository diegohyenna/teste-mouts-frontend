import { CityService } from './../../services/city.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.sass'],
})
export class CityComponent implements OnInit {
  public loading = false;
  public alert = { type: '', message: '' };
  public cities: any;

  constructor(public cityService: CityService, private router: Router) {
    let nav = this.router.getCurrentNavigation();
    if (nav?.extras?.state?.status) {
      this.alert = {
        type: nav?.extras?.state?.status?.type,
        message: nav?.extras?.state?.status?.message,
      };
    }
  }

  ngOnInit(): void {
    this.loading = true;
    this.cityService
      .getCities()
      .then((cities: any) => {
        this.loading = false;
        this.cities = cities.result;
      })
      .catch((error) => {
        this.loading = false;
        this.alert.type = 'danger';
        this.alert.message = error.message;
      });
  }

  close() {
    this.alert.type = '';
    this.alert.message = '';
  }

  deleteCity(id: string) {
    let conf = confirm('Deseja realmente deletar o dados?');
    if (conf) {
      this.cityService
        .deleteCity(id)
        .then((res: any) => {
          if (res?.result?.affectedRows) {
            this.alert.type = 'success';
            this.alert.message = 'Cidade deletada com sucesso!';
            this.cities = this.cities.filter((city: any) => city.CID_ID !== id);
          } else {
            this.alert.type = 'warning';
            this.alert.message = 'Não foi possível deletar a cidade!';
          }
        })
        .catch((error) => {
          this.alert.type = 'danger';
          this.alert.message = error.message;
        });
    }
  }
}
