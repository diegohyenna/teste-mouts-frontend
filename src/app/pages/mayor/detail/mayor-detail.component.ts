import { MayorService } from './../../../services/mayor.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mayor-detail',
  templateUrl: './mayor-detail.component.html',
  styleUrls: ['./mayor-detail.component.sass'],
})
export class MayorDetailComponent implements OnInit {
  public loading = false;
  public alert = {
    type: '',
    message: '',
  };
  public mayor: any;

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
          this.loading = false;
          this.mayor = mayor.result[0];
        })
        .catch((error) => {
          this.loading = false;
          this.alert.type = 'danger';
          this.alert.message = error.message;
        });
    } else {
      this.alert.type = 'danger';
      this.alert.message = 'Não foi possível obter o id do prefeito!';
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
