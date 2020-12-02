import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Poste} from "../models/poste"
import { Utilisateur } from '../models/utilisateur';
import {UploadfileResponse} from "../models/uploadfile-response"
@Injectable({
  providedIn: 'root'
})
export class PosteService {
  Url = "http://localhost:8090/postes";
  Url1 = "http://localhost:8090/file";
  constructor(private http:HttpClient) { }

  ///cette methode permet de recupere tous les utilisateurs
  getAllPostes():Observable<Array<Poste>>{
    return this.http.get<Array<Poste>>(this.Url);
  }

  ///cette methode permet de recupere tous les utilisateur par cat du poste
  getByPosteCategorie(categorie: String):Observable<Array<Utilisateur>>{
    return this.http.get<Array<Utilisateur>>(this.Url+"/poste/categorie/"+categorie);
  }

  ///cette methode permet de recupere tous les utilisateur par date du poste
  getByPostePosteDate(date: String):Observable<Array<Utilisateur>>{
    return this.http.get<Array<Utilisateur>>(this.Url+"/poste/datePoste/"+date);
  }



  ///cette methode permet de stocker le poste et le fichier qui lui est joinier.
  addPoste(poste:Poste,file:File){
    this.storeFile(file).subscribe((data) => {
      poste.type = data.fileType;
      poste.fichierNom = data.fileName;
      console.log( poste.fichierNom);
      poste.lien = data.fileDownloadUri;
      console.log("lllllllllllllllllllll");
      this.http.post<Poste>(this.Url,poste).subscribe((data)=>{
        console.log(data.lien);
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
  countRactionsLike(idUtilisateur:String,datePoste:string):Observable<number>{
   return this.http.get<number>(this.Url+"/countlikeReactions?idUtilisateur="+idUtilisateur+"&datePoste="+datePoste);
  }
  countRactionsDislike(idUtilisateur:String,datePoste:string):Observable<number>{
    return this.http.get<number>(this.Url+"/countdislikeReactions?idUtilisateur="+idUtilisateur+"&datePoste="+datePoste);
   }
  countCommentaires(idUtilisateur:String,datePoste:string){
    return this.http.get<number>(this.Url+"/countCommentaires?idUtilisateur="+idUtilisateur+"&datePoste="+datePoste);
  }

miseAjourPoste(poste: Poste){
  return this.http.put(this.Url,poste);
}
///cette methode permet de recupere tous les utilisateur par odre des postes
  getByOrderPostes(): Observable<Array<Utilisateur>>{
    return this.http.get<Array<Utilisateur>>(this.Url+ "/allactive");
  }
}
