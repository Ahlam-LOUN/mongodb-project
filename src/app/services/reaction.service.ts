import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import {Reaction} from "../models/Reaction";
import { Observable } from 'rxjs';
import {Commentaire} from "../models/commentaire";
@Injectable({
  providedIn: 'root'
})
export class ReactionService {
  Url = "http://localhost:8090/reactions";
  constructor(private http:HttpClient) { }

addReaction(idPoste:number,reaction:Reaction):Observable<Reaction>{
  return this.http.post<Reaction>(this.Url+"/idPoste/"+idPoste,reaction);
}
deleteReaction(idReaction: number){
  return this.http.delete<Reaction>(this.Url+"/id/"+idReaction);
}
getReaction(idReaction: number): Observable<Reaction>{
  return this.http.get<Reaction>(this.Url+ '/{id}?id='+idReaction);
}
}
