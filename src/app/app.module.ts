import { UfEditComponent } from './pages/uf/edit/uf-edit.component';
import { UfCreateComponent } from './pages/uf/create/uf-create.component';
import { MayorCreateComponent } from './pages/mayor/create/mayor-create.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuComponent } from './components/menu/menu.component';
import { MayorComponent } from './pages/mayor/mayor.component';
import { UfComponent } from './pages/uf/uf.component';
import { CityComponent } from './pages/city/city.component';
import { PageNotfoundComponent } from './pages/page-notfound/page-notfound.component';
import { MayorDetailComponent } from './pages/mayor/detail/mayor-detail.component';
import { MayorEditComponent } from './pages/mayor/edit/mayor-edit.component';
import { UfDetailComponent } from './pages/uf/detail/uf-detail.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    MayorComponent,
    UfComponent,
    CityComponent,
    PageNotfoundComponent,
    MayorDetailComponent,
    MayorEditComponent,
    MayorCreateComponent,
    UfCreateComponent,
    UfEditComponent,
    UfDetailComponent,
    FooterComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, NgbModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
