import { ContactComponent } from './../../components/contact/contact.component';
import { AboutComponent } from './../../components/about/about.component';
import { PostesComponent } from './../../components/postes/postes.component';

import { Routes } from '@angular/router';
import {AccueilComponent} from "../../components/accueil/accueil.component";
import {HeaderComponent} from "../../components/header/header.component";
import {LoginComponent} from "../../components/login/login.component";


export const routes:Routes=[

    {path:'contact', component: ContactComponent},
    {path:'about', component: AboutComponent},
    {path:'postes', component: PostesComponent},
    {path:'header', component: HeaderComponent},
    {path:'', component: AccueilComponent},
    { path: '', redirectTo: '/', pathMatch: 'full' }
]
