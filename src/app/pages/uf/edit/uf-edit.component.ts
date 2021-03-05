import { UfService } from './../../../services/uf.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-uf-edit',
  templateUrl: './uf-edit.component.html',
  styleUrls: ['./uf-edit.component.sass'],
})
export class UfEditComponent implements OnInit {
  public alert = { type: '', message: '' };
  public loading = false;
  public error: any;

  public id = new FormControl('');
  public name = new FormControl('');
  public sigla = new FormControl('');

  constructor(
    public ufService: UfService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loading = true;
      this.ufService
        .getUf(id)
        .then((uf: any) => {
          this.id.setValue(uf.result[0].UF_ID);
          this.name.setValue(uf.result[0].UF_NOME);
          this.sigla.setValue(uf.result[0].UF_SIGLA);
          this.loading = false;
        })
        .catch(() => {
          this.alert.type = 'danger';
          this.alert.message = 'Algo deu errado!';
          this.loading = false;
        });
    } else {
      this.alert.type = 'danger';
      this.alert.message = 'Não foi possível obter o id do estado!';
      this.loading = false;
    }
  }

  update(event: any) {
    event.preventDefault();
    event.stopPropagation();
    if (this.id.value && this.name.value && this.sigla.value) {
      this.error = false;
      this.ufService
        .updateUf(this.id.value, this.name.value, this.sigla.value)
        .then((res: any) => {
          if (res?.result?.affectedRows && res?.result?.changedRows) {
            this.router.navigateByUrl('/ufs', {
              state: {
                status: {
                  type: 'success',
                  message: 'Dados alterados com sucesso!',
                },
              },
            });
          } else {
            this.router.navigateByUrl('/ufs', {
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

  close() {
    this.alert.type = '';
    this.alert.message = '';
  }

  goBack() {
    this.router.navigate(['/ufs']);
  }
}
