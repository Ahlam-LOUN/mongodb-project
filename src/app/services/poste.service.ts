import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Poste} from "../models/poste"
import { Utilisateur } from '../models/utilisateur';
import {UploadfileResponse} from "../models/uploadfile-response"
import { formatDate } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class PosteService {
  Url = "http://localhost:8090/Utilisateurs";
  Url1 = "http://localhost:8090/file";
  constructor(private http:HttpClient) { }


  ///cette methode ermet de recupere tous les postes
  getAllPostes():Observable<Array<Utilisateur>>{
    return this.http.get<Array<Utilisateur>>(this.Url);
  }


  ///cette methode permet de stocker le poste et le fichier qui lui est joinier.
  addPoste(id:String,poste:Poste,file:File){
    this.storeFile(file).subscribe((data)=>{
      poste.type = data.fileType;
      poste.fichierNom = data.fileName;
      poste.lien = data.fileDownloadUri;
      console.log("lllllllllllllllllllll");
      this.http.post<Poste>(this.Url+"/poste/"+id,poste).subscribe((data)=>{
        console.log(data.lien)
      })
    })
   
  }
  ///cette methode permet de syocker le fichier dans le dossier pieces sur le backend puis retourne ses info 
  ///le nom,le lien de telechergement...
  storeFile(file:File):Observable<UploadfileResponse>{
    const formData: FormData = new FormData();
    formData.append('file', file);    
    return this.http.post<UploadfileResponse>(this.Url1,formData);
  }
getPiece(fileName:String):Observable<any>{
  const httpOptions = {
    headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    })
};
   return this.http.get<any>(this.Url1+"/"+fileName,httpOptions);
}

}
