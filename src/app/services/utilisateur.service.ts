import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Utilisateur} from "../models/utilisateur";
import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  Url = "http://localhost:8090/Utilisateurs";
  constructor(private http:HttpClient) { }
  getById(id: String):Observable<Utilisateur>{
    return this.http.get<Utilisateur>(this.Url+"/id/"+id);
  }
  getByMail(mail: String):Observable<Utilisateur>{
    return this.http.get<Utilisateur>(this.Url+"/mail/"+mail);
  }
}
