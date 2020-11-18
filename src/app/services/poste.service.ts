import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Poste} from "../models/poste"
import { Utilisateur } from '../models/utilisateur';
@Injectable({
  providedIn: 'root'
})
export class PosteService {
  Url = "http://localhost:8090/Utilisateurs";
  constructor(private http:HttpClient) { }

  getAllPostes():Observable<Array<Utilisateur>>{
    return this.http.get<Array<Utilisateur>>(this.Url);
  }
}
