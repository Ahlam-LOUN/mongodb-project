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
import {newArray} from "@angular/compiler/src/util";
@Component({
  selector: 'app-postes',
  templateUrl: './postes.component.html',
  styleUrls: ['./postes.component.scss']
})
export class PostesComponent implements OnInit {
  poste: Poste = new Poste();
  utilisateurs: Array<Utilisateur>;
  utilisateursActifs: Array<Utilisateur>;
  currentUser: Utilisateur = new Utilisateur();
  postes: Array<Poste>;
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
      this.postes = data;
      console.log(this.utilisateurs)
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
    this.posteservice.addPoste(this.currentUser.idUtilisateur,this.poste,this.file);
  }
  change(event) {

    this.commentaire.contenu = event.target.value;
  }
  getByPosteCategorie(categorie: String){
    this.posteservice.getByPosteCategorie(categorie).subscribe((data)=>{
      this.postes = data;
      console.log(this.postes)
    });
  }

  getByOrderPostes(){
    this.posteservice.getByOrderPostes().subscribe((data)=>{
      this.utilisateursActifs = data;
      console.log(this.utilisateursActifs)
    });
  }

  miseAjourPoste(poste:Poste){
    poste.etape="Financé par "+this.currentUser.entreprise;
    console.log(poste);
    this.posteservice.miseAjourPoste(poste).subscribe(data=>{
        console.log(poste);
      }
    );
  }

  addCommentaire(idPoste: number){
    console.log("dzcdcsdc"+idPoste);
    this.commentateur.idUtilisateur = this.currentUser.idUtilisateur;
    this.commentaire.commentateur = this.commentateur;
    this.commentaireservce.addCommentaire(idPoste,this.commentaire).subscribe((data)=>{
      this.ngOnInit();
      console.log(data);
    })
  }
  countRactionsLike(poste: Poste):number{
    let like = 0;

    for (let r of poste.reactions){
      if (r.type == "Like"){
        like++;
      }
    }
    return like;
  }
  countRactionsDislike(poste: Poste):number{
    let dislike = 0;
    for (let r of poste.reactions){
      if (r.type == "Dislike"){
        dislike++;
      }
    }
    return dislike;
  }

  addReaction(poste:Poste,type:string){
    if (this.VerifierReactif(poste) == "pas"){
      this.reaction.type= type;
      console.log(this.currentUser);
      this.reactif.idUtilisateur = this.currentUser.idUtilisateur;
      this.reaction.reactif = this.reactif;
      this.reactionservice.addReaction(poste.idPsote,this.reaction).subscribe((data)=>{
        this.ngOnInit();
        console.log("aucune reaction"+data);
      });
    }
    else{
    if (this.VerifierReactif(poste) == type){
      this.reactionservice.deleteReaction(+localStorage.getItem('idReaction')).subscribe((data)=>{
        this.ngOnInit();
        console.log("supp data == type"+data);
      });
    }
    else {
      console.log("else else");
      // ajouter recation
      this.reaction.type= type;
      this.reactif.idUtilisateur = this.currentUser.idUtilisateur;
      this.reaction.reactif = this.reactif;
      this.reactionservice.addReaction(poste.idPsote,this.reaction).subscribe((data)=>{
        this.ngOnInit();
        console.log("ajout when data =! type"+data);
        //supprimer reaction
        this.reactionservice.deleteReaction(+localStorage.getItem('idReaction')).subscribe((data)=>{
          this.ngOnInit();
          console.log("supp when data =! type"+data);
        });
      });
    }
    }
  }
  VerifierReactif(poste: Poste):string{
    let res = "pas"
      for(let r of poste.reactions){
        if(r.reactif.idUtilisateur == this.currentUser.idUtilisateur){
          res= r.type;
          localStorage.setItem('idReaction',''+r.idReaction);
        }
      }
      return res;
  }
}
