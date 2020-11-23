import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public dialog: MatDialog, private router: Router,) { }
  user: String;
  ngOnInit(): void {
    this.user= localStorage.getItem('connectedUser');
  }
  openLoginForm() {
   this.dialog.open(LoginComponent, {width: '500px', height: '450px'});
  }
  openRegisterForm() {
    this.dialog.open(RegisterComponent, {width: '500px', height: '550px'});
   }
   versAccueil(){
     this.router.navigate(['']);
     localStorage.removeItem('connectedUser');
   }
  testLogin(): boolean{
    if (localStorage.getItem('connectedUser') == null){return false; }
    else { return true; }
  }
}
