import { MayorService } from './../../../services/mayor.service';
import { CityService } from './../../../services/city.service';
import { UfService } from './../../../services/uf.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-city-edit',
  templateUrl: './city-edit.component.html',
  styleUrls: ['./city-edit.component.sass'],
})
export class CityEditComponent implements OnInit {
  public alert = { type: '', message: '' };
  public error = false;
  public loading = false;

  public id = new FormControl('');
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
          this.id.setValue(city.result[0].CID_ID);
          this.name.setValue(city.result[0].CID_NOME);
          this.uf.setValue(city.result[0].UF_ID);
          this.mayor.setValue(city.result[0].PRE_ID);
          this.population.setValue(city.result[0].CID_POPULACAO);

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
                        message:
                          'Não foi possivel carregar o select de prefeitos!',
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
        })
        .catch(() => {
          this.alert.type = 'danger';
          this.alert.message = 'Algo deu errado!';
          this.loading = false;
        });
    } else {
      this.alert.type = 'danger';
      this.alert.message = 'Não foi possível obter o id da cidade!';
      this.loading = false;
    }
  }

  update(event: any) {
    event.stopPropagation();
    event.preventDefault();

    if (this.id.value && this.name.value && this.uf.value) {
      this.cityService
        .updateCity(
          this.id.value,
          this.name.value,
          this.uf.value,
          this.mayor.value,
          this.population.value
        )
        .then((res: any) => {
          if (res?.result?.affectedRows && res?.result?.changedRows) {
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
                  message: 'Não foi possivel alterar os dados!',
                },
              },
            });
          }
        })
        .catch(() => {
          this.alert.type = 'danger';
          this.alert.message = 'Não foi possível salvar os dados!';
        });
    } else {
      this.error = true;
      this.alert.type = 'warning';
      this.alert.message = 'Os campos não podem ser em branco!';
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
