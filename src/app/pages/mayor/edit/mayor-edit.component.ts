import { MayorService } from '../../../services/mayor.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-mayor-edit',
  templateUrl: './mayor-edit.component.html',
  styleUrls: ['./mayor-edit.component.sass'],
})
export class MayorEditComponent implements OnInit {
  public alert = { type: '', message: '' };
  public error = false;
  public loading = false;

  public id = new FormControl('');
  public name = new FormControl('');

  constructor(
    public mayorService: MayorService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loading = true;
      this.mayorService
        .getMayor(id)
        .then((mayor: any) => {
          this.id.setValue(mayor.result[0].PRE_ID);
          this.name.setValue(mayor.result[0].PRE_NOME);
          this.loading = false;
        })
        .catch(() => {
          this.alert.type = 'danger';
          this.alert.message = 'Algo deu errado!';
          this.loading = false;
        });
    } else {
      this.alert.type = 'danger';
      this.alert.message = 'Não foi possível obter o id do prefeito!';
      this.loading = false;
    }
  }

  update(event: any) {
    event.preventDefault();
    event.stopPropagation();
    if (this.id.value && this.name.value) {
      this.error = false;
      this.mayorService
        .updateMayor(this.id.value, this.name.value)
        .then((res: any) => {
          if (res?.result?.affectedRows && res?.result?.changedRows) {
            this.router.navigateByUrl('/mayors', {
              state: {
                status: {
                  type: 'success',
                  message: 'Dados alterados com sucesso!',
                },
              },
            });
          } else {
            this.router.navigateByUrl('/mayors', {
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
    this.router.navigate(['/mayors']);
  }
}
