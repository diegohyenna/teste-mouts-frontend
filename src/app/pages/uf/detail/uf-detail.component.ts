import { UfService } from './../../../services/uf.service';
import { MayorService } from '../../../services/mayor.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mayor-detail',
  templateUrl: './uf-detail.component.html',
  styleUrls: ['./uf-detail.component.sass'],
})
export class UfDetailComponent implements OnInit {
  public loading = false;
  public alert = {
    type: '',
    message: '',
  };
  public uf: any;

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
          this.loading = false;
          this.uf = uf.result[0];
        })
        .catch((error) => {
          this.loading = false;
          this.alert.type = 'danger';
          this.alert.message = error.message;
        });
    } else {
      this.alert.type = 'danger';
      this.alert.message = 'Não foi possível obter o id do estado!';
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
