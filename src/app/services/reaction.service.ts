import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import {Reaction} from "../models/Reaction";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ReactionService {
  Url = "http://localhost:8090/Utilisateurs";
  constructor(private http:HttpClient) { }
  
addReaction(idUtilisateur:String,datePoste:String,reaction:Reaction):Observable<Reaction>{
  return this.http.post<Reaction>(this.Url+"/reaction?idUtilisateur="+idUtilisateur+"&datePoste="+datePoste,reaction);
}
}
