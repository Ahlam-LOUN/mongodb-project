import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Commentaire } from '../models/commentaire';

@Injectable({
  providedIn: 'root'
})
export class CommentaireService {
  Url = "http://localhost:8090/Utilisateurs";
  constructor(private http:HttpClient) { }

addCommentaire(idUtilisateur:String,datePoste:String,commentaire:Commentaire):Observable<Commentaire>{
  return this.http.post<Commentaire>(this.Url+"/commentaire?idUtilisateur="+idUtilisateur+"&datePoste="+datePoste,commentaire);
}
}
