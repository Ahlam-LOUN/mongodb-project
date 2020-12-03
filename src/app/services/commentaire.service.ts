import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Commentaire } from '../models/commentaire';

@Injectable({
  providedIn: 'root'
})
export class CommentaireService {
  UrlCommentaire = 'http://localhost:8090/commentaires';
  Url = 'http://localhost:8090/commentaires';
  constructor(private http: HttpClient) { }

 addCommentaire(idPoste: number, commentaire: Commentaire): Observable<Commentaire> {
   return this.http.post<Commentaire>(this.UrlCommentaire + '/' + idPoste, commentaire);
 }
  deleteCommentaire(idCommentaire: number): Observable<boolean>{
    return this.http.delete<boolean>(this.UrlCommentaire + '/' + idCommentaire);
  }
  updateCommentaire(commentaire: Commentaire): Observable<Commentaire>{
    return this.http.put<Commentaire>(this.UrlCommentaire, commentaire);
  }
  getCommentaire(IdCommentaire: number): Observable<Commentaire>{
    return this.http.get<Commentaire>(this.UrlCommentaire+ '/');
  }
}
