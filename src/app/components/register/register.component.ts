import { Component, OnInit } from '@angular/core';
import {Utilisateur} from "../../models/utilisateur";
import {UtilisateurService} from "../../services/utilisateur.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  utilisateur: Utilisateur ;
  user = {username: '', password: '', remember: false};

  constructor(private UtilisateurService: UtilisateurService, private router: Router) {
    this.utilisateur = new Utilisateur();
  }

  ngOnInit(): void {

  }
  AjouterUtilisateur(){
    console.log(this.utilisateur);
   // this.UtilisateurService.AjouterUtilisateur(this.utilisateur).subscribe((data) => {
  //    console.log('added');

 //   })
  }
}
