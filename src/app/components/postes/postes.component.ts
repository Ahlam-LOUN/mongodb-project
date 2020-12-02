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
import {Router} from "@angular/router";
import {newArray} from "@angular/compiler/src/util";
@Component({
  selector: 'app-postes',
  templateUrl: './postes.component.html',
  styleUrls: ['./postes.component.scss']
})

export class PostesComponent implements OnInit {
  poste: Poste = new Poste();
  postes: Array<Poste>;
  utilisateursActifs: Array<Utilisateur>;
  file: File;
  commentaire: Commentaire = new Commentaire();
  reaction: Reaction = new Reaction();
  reactif: Utilisateur = new Utilisateur();
  currentUser: Utilisateur = new Utilisateur();
  commentateur: Utilisateur = new Utilisateur();

  constructor(private router: Router, private _lightbox: Lightbox, private posteservice: PosteService, private Utilisateurservice: UtilisateurService
  , private commentaireservce: CommentaireService, private reactionservice: ReactionService) {
    this.postes = new Array<Poste>();
  }
  ngOnInit(): void {
    this.Utilisateurservice.getByMail(localStorage.getItem('connectedUser')).subscribe((data) => {
      this.currentUser = data;
      this.poste.posteur =  this.currentUser;
      this.commentaire.commentateur = data;
    });
    this.getAllPostes();
    this.getUtilisateurActive();
  }
  onfileChange(files: FileList) {
    this.file = files.item(0);
  }

  // @ts-ignore
    addPoste(){
    this.poste.etape ='poster';
    this.posteservice.addPoste(this.poste, this.file);
    this.ngOnInit()
  }
  // @ts-ignore
    domaineChange(event){
    this.poste.categorie = event.target.value;

  }
  Commentairechange(event) {
    this.commentaire.contenu = event.target.value;
  }


  getByPosteCategorie(categorie: String){
    this.posteservice.getByPosteCategorie(categorie).subscribe((data) => {
      this.postes = data;
      console.log(this.postes);
    });
  }
  getAllPostes(){
    this.posteservice.getAllPostes().subscribe((data) => {
      this.postes = data;
    })
  }


  downloadFile(fileName: String){
    this.posteservice.downloadFile(fileName).subscribe(data => {

    })
  }
  getUtilisateurActive(){
    this.posteservice.getByOrderPostes().subscribe((data) => {
        this.utilisateursActifs =data;
    });
  }

  miseAjourPoste(poste:Poste){
    poste.etape= 'Financé par ' + this.currentUser.entreprise;
    this.posteservice.miseAjourPoste(poste).subscribe(data => {
        console.log(poste);
      }
    );
  }

  addCommentaire(idPoste: number){
    this.commentaireservce.addCommentaire(idPoste, this.commentaire).subscribe((data)=>{
      this.ngOnInit();
      console.log(data);
    });
  }
  countRactionsLike(poste: Poste): number{
    let like = 0;
    for (let r of poste.reactions){
      if (r.type == 'Like'){
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
      this.reactionservice.addReaction(poste.idPoste,this.reaction).subscribe((data)=>{
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
        this.reactionservice.addReaction(poste.idPoste,this.reaction).subscribe((data)=>{
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
    console.log("verifierReaction");
    let res = "pas"
    for(let r of poste.reactions){
      console.log(r.reactif.idUtilisateur);
      console.log(this.currentUser.idUtilisateur);
      if(r.reactif.idUtilisateur == this.currentUser.idUtilisateur){
        res= r.type;
        localStorage.setItem('idReaction',''+r.idReaction);
        console.log(this.currentUser.idUtilisateur);
      }
    }
    return res;
  }
}
