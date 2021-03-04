import { MayorService } from './../../services/mayor.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mayor',
  templateUrl: './mayor.component.html',
  styleUrls: ['./mayor.component.sass'],
})
export class MayorComponent implements OnInit {
  public loading = false;
  public alert = { type: '', message: '' };
  public mayors: any;

  constructor(public mayorService: MayorService, private router: Router) {
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
    this.mayorService
      .getMayors()
      .then((mayors: any) => {
        this.loading = false;
        this.mayors = mayors.result;
      })
      .catch((error) => {
        this.loading = false;
        this.alert.type = 'danger';
        this.alert.message = error.message;
      });

    // this.mayorService
    //   .getMayorByName('ma')
    //   .then((mayors) => {
    //     console.log(mayors);
    //   })
    //   .catch((error) => console.log(error));
  }

  close() {
    this.alert.type = '';
    this.alert.message = '';
  }

  deleteMayor(id: string) {
    let conf = confirm('Deseja realmente deletar o dados?');
    if (conf) {
      this.mayorService
        .deleteMayor(id)
        .then((res: any) => {
          console.log(res);
          if (res?.result?.affectedRows) {
            this.alert.type = 'success';
            this.alert.message = 'Prefeito deletado com sucesso!';
            this.mayors = this.mayors.filter(
              (mayor: any) => mayor.PRE_ID !== id
            );
          } else {
            this.alert.type = 'warning';
            this.alert.message = 'Não foi possível deletar o prefeito!';
          }
        })
        .catch((error) => {
          this.alert.type = 'danger';
          this.alert.message = error.message;
        });
    }
  }
}
