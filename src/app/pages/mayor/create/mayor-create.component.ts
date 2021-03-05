import { MayorService } from './../../../services/mayor.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-mayor-create',
  templateUrl: './mayor-create.component.html',
  styleUrls: ['./mayor-create.component.sass'],
})
export class MayorCreateComponent implements OnInit {
  public alert = { type: '', message: '' };
  public error = false;
  public loading = false;

  public name = new FormControl('');

  constructor(public mayorService: MayorService, private router: Router) {}

  ngOnInit(): void {}

  create(event: any) {
    event.preventDefault();
    event.stopPropagation();
    if (this.name.value) {
      this.error = false;
      this.loading = true;
      this.mayorService
        .createMayor(this.name.value)
        .then((res: any) => {
          if (res?.result?.affectedRows && res?.result.id) {
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
