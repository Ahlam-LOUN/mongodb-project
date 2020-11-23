import { Component, OnInit } from '@angular/core';
import {Poste} from "../../models/poste";
import {Lightbox} from "ngx-lightbox";
import {PosteService} from "../../services/poste.service"
import { Utilisateur } from 'src/app/models/utilisateur';
import {UtilisateurService} from "../../services/utilisateur.service";
@Component({
  selector: 'app-postes',
  templateUrl: './postes.component.html',
  styleUrls: ['./postes.component.scss']
})
export class PostesComponent implements OnInit {
  poste: Poste = new Poste();
  utilisateurs: Array<Utilisateur>;
  utilisateursActifs: Array<Utilisateur>;
  currentUser: Utilisateur;
  id:String = "5fba8df9f4131931a094aa40";
  file:File;
  constructor(private _lightbox: Lightbox,private posteservice:PosteService, private Utilisateurservice:UtilisateurService) {
    this.utilisateurs = new Array<Utilisateur>();
  }
  ngOnInit(): void {
    this.posteservice.getAllPostes().subscribe((data)=>{
        this.utilisateurs = data;
        console.log(this.utilisateurs)
    });
    this.posteservice.getByOrderPostes().subscribe((data)=>{
      this.utilisateursActifs = data;
      console.log(this.utilisateursActifs)
    });
    this.Utilisateurservice.getByMail(localStorage.getItem('connectedUser')).subscribe((data)=>{
      this.currentUser = data;
      console.log(this.currentUser)
    });
  }
  ///cette methode recupere le fichier choisie par l'utilisateur.
  onChange(files: FileList){
    this.file=files.item(0);
  }

  ///ctte methode fait apelle au methode addposte dans posteservice
  addPoste(){
    this.posteservice.addPoste(this.id,this.poste,this.file)
    /*this.posteservice.getPiece("UseCase.PNG").subscribe((data)=>{
      console.log(data);
    })*/
  }
  getByPosteCategorie(categorie: String){
    this.posteservice.getByPosteCategorie(categorie).subscribe((data)=>{
      this.utilisateurs = data;
      console.log(this.utilisateurs)
    });
  }

  getByOrderPostes(){
    this.posteservice.getByOrderPostes().subscribe((data)=>{
      this.utilisateursActifs = data;
      console.log(this.utilisateursActifs)
    });
  }

  miseAjourPoste(idUser: string, poste:Poste){
    poste.etape="Financé";
    console.log(poste);
    this.posteservice.miseAjourPoste(idUser,poste).subscribe(data=>{
      console.log(poste);
      }
    );
  }
}
