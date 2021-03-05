import { UfService } from './../../services/uf.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-uf',
  templateUrl: './uf.component.html',
  styleUrls: ['./uf.component.sass'],
})
export class UfComponent implements OnInit {
  public loading = false;
  public alert = { type: '', message: '' };
  public ufs: any;

  constructor(public ufService: UfService, private router: Router) {
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
    this.ufService
      .getUfs()
      .then((ufs: any) => {
        this.loading = false;
        this.ufs = ufs.result;
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

  deleteUf(id: string) {
    let conf = confirm('Deseja realmente deletar o dados?');
    if (conf) {
      this.ufService
        .deleteUf(id)
        .then((res: any) => {
          if (res?.result?.affectedRows) {
            this.alert.type = 'success';
            this.alert.message = 'Estado deletado com sucesso!';
            this.ufs = this.ufs.filter((uf: any) => uf.UF_ID !== id);
          } else {
            this.alert.type = 'warning';
            this.alert.message = 'Não foi possível deletar o estado!';
          }
        })
        .catch((error) => {
          this.alert.type = 'danger';
          this.alert.message = error.message;
        });
    }
  }
}
