import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {UtilisateurService} from "../../services/utilisateur.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user = {username: '', password: '', remember: false};
  constructor(private router: Router, public dialogRef: MatDialogRef<LoginComponent>, private Utilisateurservice:UtilisateurService) { }

  ngOnInit(): void {
    console.log('User: ', this.user);
    // this.dialogRef.close();
  }
  login(){
    localStorage.setItem('connectedUser', this.user.username);
    this.router.navigate(['postes']);
  }

}
