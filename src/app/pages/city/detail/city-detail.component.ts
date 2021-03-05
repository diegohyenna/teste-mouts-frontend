import { CityService } from './../../../services/city.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-city-detail',
  templateUrl: './city-detail.component.html',
  styleUrls: ['./city-detail.component.sass'],
})
export class CityDetailComponent implements OnInit {
  public loading = false;
  public alert = {
    type: '',
    message: '',
  };
  public city: any;

  constructor(
    public cityService: CityService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.loading = true;
      this.cityService
        .getCity(id)
        .then((city: any) => {
          this.loading = false;
          this.city = city.result[0];
        })
        .catch((error) => {
          this.loading = false;
          this.alert.type = 'danger';
          this.alert.message = error.message;
        });
    } else {
      this.alert.type = 'danger';
      this.alert.message = 'Não foi possível obter o id da cidade!';
    }
  }

  close() {
    this.alert.type = '';
    this.alert.message = '';
  }

  goBack() {
    this.router.navigate(['/cities']);
  }
}
