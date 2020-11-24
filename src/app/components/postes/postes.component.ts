import { Component, OnInit } from '@angular/core';
import {Poste} from "../../models/poste";
import {Lightbox} from "ngx-lightbox";
import {PosteService} from "../../services/poste.service"
import { Utilisateur } from 'src/app/models/utilisateur';
import {UtilisateurService} from "../../services/utilisateur.service";
import {Commentaire} from "../../models/commentaire";
import {Reaction} from "../../models/reaction";
import {CommentaireService} from "../../services/commentaire.service";
import {ReactionService} from "../../services/reaction.service";
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
  file:File;
  commentaire:Commentaire = new Commentaire();
  commentateur:Utilisateur = new Utilisateur();
  reaction:Reaction = new Reaction();
  reactif:Utilisateur = new Utilisateur();

  constructor(private _lightbox: Lightbox,private posteservice:PosteService, private Utilisateurservice:UtilisateurService
  ,private commentaireservce:CommentaireService, private reactionservice:ReactionService) {
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
    this.posteservice.addPoste(this.currentUser.id_Utilisateur,this.poste,this.file);
  }
  change(event) {

    this.commentaire.contenu = event.target.value;
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
    poste.etape="Financé par "+this.currentUser.entreprise;
    console.log(poste);
    this.posteservice.miseAjourPoste(idUser,poste).subscribe(data=>{
        console.log(poste);
      }
    );
  }

  addCommentaire(idUtilisateur,datePoste){
    console.log("dzcdcsdc"+idUtilisateur);
    this.commentateur.id_Utilisateur = this.currentUser.id_Utilisateur;
    this.commentaire.commentateur = this.commentateur;
    this.commentaireservce.addCommentaire(idUtilisateur,datePoste,this.commentaire).subscribe((data)=>{
      this.ngOnInit();
      console.log(data);
    })
  }
  countRactionsLike(idUtilisateur:String,datePoste:string):number{
    this.posteservice.countRactionsLike(idUtilisateur,datePoste).subscribe((data)=>{
      console.log("data"+data);
      return data;
    })
    return 0;
  }
  countRactionsDislike(idUtilisateur:String,datePoste:string):number{
    this.posteservice.countRactionsDislike(idUtilisateur,datePoste).subscribe((data)=>{
      return data;
      console.log("data"+data);
    })
    return 0;
  }
  countCommentaires(idUtilisateur:String,datePoste:string):number{
    this.posteservice.countCommentaires(idUtilisateur,datePoste).subscribe((data)=>{
      return data;
    })
    return 0;
  }

  addReaction(idUtilisateur:String,datePoste:String,event){
    this.reaction.type= event.target.value;
    console.log("dzcdcsdc"+idUtilisateur);
    this.reactif.id_Utilisateur = this.currentUser.id_Utilisateur;
    this.reaction.reactif = this.reactif;
    this.reactionservice.addReaction(idUtilisateur,datePoste,this.reaction).subscribe((data)=>{
      this.ngOnInit();
      console.log(data);
    })

  }
}
