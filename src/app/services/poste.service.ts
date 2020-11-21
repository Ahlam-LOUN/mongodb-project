import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Poste} from "../models/poste"
import { Utilisateur } from '../models/utilisateur';
import {UploadfileResponse} from "../models/uploadfile-response"
@Injectable({
  providedIn: 'root'
})
export class PosteService {
  Url = "http://localhost:8090/Utilisateurs";
  Url1 = "http://localhost:8090/file";
  constructor(private http:HttpClient) { }

  getAllPostes():Observable<Array<Utilisateur>>{
    return this.http.get<Array<Utilisateur>>(this.Url);
  }
  addPoste(id:String,poste:Poste,file:File):Observable<Poste>{
    this.storeFile(file).subscribe((data)=>{
      poste.fichierNom =data.fileName;
      poste.lien = data.fileDownloadUri;
      return this.http.post<Poste>(this.Url+"/poste/"+id,poste);
    })
    return null;
  }

  storeFile(file:File):Observable<UploadfileResponse>{
    var formData: any = new FormData();
    formData.append('file', file);
    
    return this.http.post<UploadfileResponse>(this.Url1,formData);
  }
}
