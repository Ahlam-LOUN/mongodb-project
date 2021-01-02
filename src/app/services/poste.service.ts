import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Poste} from '../models/poste';
import { Utilisateur } from '../models/utilisateur';
import {UploadfileResponse} from '../models/uploadfile-response';
@Injectable({
  providedIn: 'root'
})
export class PosteService {
  Url = 'http://localhost:8090/postes';
  Url1 = 'http://localhost:8090/file';
  constructor(private http: HttpClient) { }


  ///cette methode ermet de recupere les postes par posteur
  getPostesByMail(mail: String):Observable<Array<Poste>>{
    return this.http.get<Array<Poste>>(this.Url+"/mail/"+mail);
  }

  /*cette methode ermet de recupere tous les postes*/
 getAllPostes(): Observable<Array<Poste>>{
   return this.http.get<Array<Poste>>(this.Url);
 }

 /*cette methode permet de recupere tous les utilisateur par cat du poste*/
  getByPosteCategorie(categorie: String): Observable<Array<Poste>>{
    return this.http.get<Array<Poste>>(this.Url + '/categorie/' + categorie);
  }

/*cette methode permet de recupere tous les utilisateur par date du poste*/
getByPostePosteDate(date: String): Observable<Array<Utilisateur>>{
 return this.http.get<Array<Utilisateur>>(this.Url + '/datePoste/' + date);
}


downloadFile(fileName: String): Observable<undefined>{
  return this.http.get<undefined>(this.Url1 + '/' + fileName);
}


 /*cette methode permet de stocker le poste et le fichier qui lui est joinier.*/

addPoste(poste: Poste, file: File) {
  console.log('file'+file);
  if (file == undefined) {
    this.http.post<Poste>(this.Url, poste).subscribe((data) => {

    });
  } else {
    this.storeFile(file).subscribe((data) => {
      poste.type = data.fileType;
      poste.fichierNom = data.fileName;
      console.log(poste.fichierNom);
      poste.lien = data.fileDownloadUri;
      console.log('lllllllllllllllllllll');
      this.http.post<Poste>(this.Url, poste).subscribe((data) => {
        console.log(data.lien);
      });
    });
  }
}
 /*cette methode permet de syocker le fichier dans le dossier pieces sur le backend puis retourne ses info*/
/*le nom,le lien de telechergement...*/
storeFile(file: File): Observable<UploadfileResponse>{
 const formData: FormData = new FormData();
 formData.append('file', file);
 return this.http.post<UploadfileResponse>(this.Url1, formData);
}


/*cette methode permet de recupere tous les utilisateur par odre des postes*/
getByOrderPostes(): Observable<Array<Utilisateur>>{
 return this.http.get<Array<Utilisateur>>(this.Url + '/allactive');
}
// tslint:disable-next-line:typedef
miseAjourPoste(poste: Poste){
 return this.http.put(this.Url + '/poste', poste);
}
}
