import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import{MatListModule} from'@angular/material/list'
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FormsModule} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import 'hammerjs';
import {MatSliderModule} from '@angular/material/slider';
import {HttpClientModule} from '@angular/common/http'
import { MatRadioModule } from '@angular/material/radio';
import {AppRoutingModule} from './app-routing/app-routing/app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { PostesComponent } from './components/postes/postes.component';
import { LightboxModule } from 'ngx-lightbox';
import { WavesModule, ModalModule, CarouselModule } from 'angular-bootstrap-md';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatExpansionModule, MatExpansionPanel} from '@angular/material/expansion';
import { AccueilComponent } from './components/accueil/accueil.component';
import { ProfilComponent } from './components/profil/profil.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    AboutComponent,
    ContactComponent,
    PostesComponent,
    AccueilComponent,
    ProfilComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    MatSelectModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    AppRoutingModule,
    MatRadioModule,
    LightboxModule,
    WavesModule.forRoot(),
    ModalModule.forRoot(),
    CarouselModule.forRoot(),
    NgbModule,
    MatExpansionModule
  ],
  providers: [MatExpansionPanel],
  bootstrap: [AppComponent],
  entryComponents: [
    LoginComponent
],
})
export class AppModule { }
