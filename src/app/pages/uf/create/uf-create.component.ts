import { UfService } from './../../../services/uf.service';
import { MayorService } from '../../../services/mayor.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-mayor-uf',
  templateUrl: './uf-create.component.html',
  styleUrls: ['./uf-create.component.sass'],
})
export class UfCreateComponent implements OnInit {
  public alert = { type: '', message: '' };
  public loading = false;

  public name = new FormControl('');
  public sigla = new FormControl('');

  constructor(public ufService: UfService, private router: Router) {}

  ngOnInit(): void {}

  create() {
    if (this.name.value && this.sigla.value) {
      this.loading = true;
      this.ufService
        .createUf(this.name.value, this.sigla.value)
        .then((res: any) => {
          if (res?.result?.affectedRows && res?.result.id) {
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
