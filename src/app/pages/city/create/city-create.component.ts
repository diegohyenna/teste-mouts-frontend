import { MayorService } from './../../../services/mayor.service';
import { UfService } from './../../../services/uf.service';
import { CityService } from './../../../services/city.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-city-create',
  templateUrl: './city-create.component.html',
  styleUrls: ['./city-create.component.sass'],
})
export class CityCreateComponent implements OnInit {
  public alert = { type: '', message: '' };
  public error = false;
  public loading = false;

  public name = new FormControl('', [Validators.required]);
  public uf = new FormControl('', [Validators.required]);
  public mayor = new FormControl('');
  public population = new FormControl('');

  public ufs: any;
  public mayors: any;

  constructor(
    private cityService: CityService,
    private ufService: UfService,
    private mayorService: MayorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.ufService
      .getUfs()
      .then((res: any) => {
        this.ufs = res.result;
        this.mayorService
          .getMayors()
          .then((res: any) => {
            this.loading = false;
            this.mayors = res.result;
          })
          .catch(() => {
            this.loading = false;
            this.router.navigateByUrl('/cities', {
              state: {
                status: {
                  type: 'danger',
                  message: 'Não foi possivel carregar o select de prefeitos!',
                },
              },
            });
          });
      })
      .catch(() => {
        this.loading = false;
        this.router.navigateByUrl('/cities', {
          state: {
            status: {
              type: 'danger',
              message: 'Não foi possivel carregar o select de estados!',
            },
          },
        });
      });
  }

  create(event: any) {
    event.stopPropagation();
    event.preventDefault();

    if (!this.name?.errors && !this.uf?.errors) {
      this.error = false;
      this.loading = true;
      this.cityService
        .createCity(
          this.name.value,
          this.uf.value,
          this.mayor.value,
          this.population.value
        )
        .then((res: any) => {
          if (res?.result?.affectedRows && res?.result.id) {
            this.router.navigateByUrl('/cities', {
              state: {
                status: {
                  type: 'success',
                  message: 'Dados alterados com sucesso!',
                },
              },
            });
          } else {
            this.router.navigateByUrl('/cities', {
              state: {
                status: {
                  type: 'danger',
                  message: 'Não foi possivel salvar os dados!',
                },
              },
            });
          }
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
          this.alert.type = 'danger';
          this.alert.message = 'Não foi possível salvar os dados!';
        });
    } else {
      this.error = true;
      this.alert.type = 'warning';
      this.alert.message = 'Os campos requeridos não podem ser em branco!';
    }
  }

  changeUf(e: any) {
    this.uf.setValue(e.target.value);
  }

  changeMayor(e: any) {
    this.mayor.setValue(e.target.value);
  }

  close() {
    this.alert.type = '';
    this.alert.message = '';
  }

  goBack() {
    this.router.navigate(['/cities']);
  }
}
