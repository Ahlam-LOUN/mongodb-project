import { ContactComponent } from './../../components/contact/contact.component';
import { AboutComponent } from './../../components/about/about.component';
import { PostesComponent } from './../../components/postes/postes.component';

import { Routes } from '@angular/router';


export const routes:Routes=[

    {path:'contact', component: ContactComponent},
    {path:'about', component: AboutComponent},
    {path:'postes', component: PostesComponent},
    { path: '', redirectTo: '/', pathMatch: 'full' }
]
