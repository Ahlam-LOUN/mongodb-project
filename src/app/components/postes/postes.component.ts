import { Component, OnInit } from '@angular/core';
import {Poste} from "../../models/poste";
import {Reaction} from 'src/app/models/Reaction';
import {Lightbox} from "ngx-lightbox";
import {PosteService} from "../../services/poste.service"
import { Utilisateur } from 'src/app/models/utilisateur';
import { Commentaire } from 'src/app/models/commentaire';
import {CommentaireService} from "../../services/commentaire.service";
import {ReactionService} from "../../services/reaction.service";
@Component({
  selector: 'app-postes',
  templateUrl: './postes.component.html',
  styleUrls: ['./postes.component.scss']
})
export class PostesComponent implements OnInit {
  poste: Poste = new Poste();
  commentaire:Commentaire = new Commentaire();
  commentateur:Utilisateur = new Utilisateur();

  reaction:Reaction = new Reaction();
  reactif:Utilisateur = new Utilisateur();
  utilisateurs: Array<Utilisateur>;
  id:String = "5fba1cf7930f96615b3dcb28";
  file:File;
  domaine= "Préciser le domaine de votre projet ?";
  constructor(private _lightbox: Lightbox,
    private posteservice:PosteService,
    private commentaireservce:CommentaireService,
    private reactionservice:ReactionService
    ) { 
    this.utilisateurs = new Array<Utilisateur>();
  }
  ngOnInit(): void {
    this.posteservice.getAllPostes().subscribe((data)=>{
        this.utilisateurs = data;
        console.log(this.utilisateurs)
    });
  }
  ///cette methode recupere le fichier choisie par l'utilisateur.
  onChange(files: FileList){
    this.file=files.item(0);
  }
   ///ctte methode fait apelle au methode addposte dans posteservice
  addPoste(){
   this.posteservice.addPoste(this.id,this.poste,this.file);
  }
  change(event) {

    this.commentaire.contenu = event.target.value;
  }
  reactionType(event) {
   this.reaction.type= event.target.value;
  }
  addCommentaire(idUtilisateur,datePoste){
    console.log("dzcdcsdc"+idUtilisateur);
    this.commentateur.id_Utilisateur = this.id;
    this.commentaire.commentateur = this.commentateur;
    this.commentaireservce.addCommentaire(idUtilisateur,datePoste,this.commentaire).subscribe((data)=>{
      this.ngOnInit();
      console.log(data);
    })
  }
  countRactionsLike(idUtilisateur:String,datePoste:string):number{
    this.posteservice.countRactionsLike(idUtilisateur,datePoste).subscribe((data)=>{
          return data;
    })
    return 0;
   }
   countRactionsDislike(idUtilisateur:String,datePoste:string):number{
    this.posteservice.countRactionsDislike(idUtilisateur,datePoste).subscribe((data)=>{
          return data;
    })
    return 0;
   }
   countCommentaires(idUtilisateur:String,datePoste:string):number{
    this.posteservice.countCommentaires(idUtilisateur,datePoste).subscribe((data)=>{
          return data;
    })
    return 0;
   }
   
   addReaction(idUtilisateur:String,datePoste:String){
    console.log("dzcdcsdc"+idUtilisateur);
    this.reactif.id_Utilisateur = this.id;
    this.reaction.reactif = this.reactif;
    this.reactionservice.addReaction(idUtilisateur,datePoste,this.reaction).subscribe((data)=>{
      this.ngOnInit();
      console.log(data);
    })

   }
  
}