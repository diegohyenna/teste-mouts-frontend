import { CityComponent } from './pages/city/city.component';
import { UfEditComponent } from './pages/uf/edit/uf-edit.component';
import { UfDetailComponent } from './pages/uf/detail/uf-detail.component';
import { UfCreateComponent } from './pages/uf/create/uf-create.component';
import { MayorCreateComponent } from './pages/mayor/create/mayor-create.component';
import { MayorEditComponent } from './pages/mayor/edit/mayor-edit.component';
import { MayorDetailComponent } from './pages/mayor/detail/mayor-detail.component';
import { PageNotfoundComponent } from './pages/page-notfound/page-notfound.component';
import { UfComponent } from './pages/uf/uf.component';
import { MayorComponent } from './pages/mayor/mayor.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CityCreateComponent } from './pages/city/create/city-create.component';
import { CityDetailComponent } from './pages/city/detail/city-detail.component';
import { CityEditComponent } from './pages/city/edit/city-edit.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'mayors',
    component: MayorComponent,
  },
  {
    path: 'mayor/create',
    component: MayorCreateComponent,
  },
  {
    path: 'mayor/:id',
    component: MayorDetailComponent,
  },
  {
    path: 'mayor/:id/edit',
    component: MayorEditComponent,
  },
  {
    path: 'ufs',
    component: UfComponent,
  },
  {
    path: 'uf/create',
    component: UfCreateComponent,
  },
  {
    path: 'uf/:id',
    component: UfDetailComponent,
  },
  {
    path: 'uf/:id/edit',
    component: UfEditComponent,
  },
  {
    path: 'cities',
    component: CityComponent,
  },
  {
    path: 'city/create',
    component: CityCreateComponent,
  },
  {
    path: 'city/:id',
    component: CityDetailComponent,
  },
  {
    path: 'city/:id/edit',
    component: CityEditComponent,
  },
  { path: '**', component: PageNotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
