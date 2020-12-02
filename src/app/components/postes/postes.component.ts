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
  currentUser: Utilisateur;
  reaction: Reaction = new Reaction();
  reactif: Utilisateur = new Utilisateur();

  constructor(private router: Router, private _lightbox: Lightbox, private posteservice: PosteService, private Utilisateurservice: UtilisateurService
  , private commentaireservce: CommentaireService, private reactionservice: ReactionService) {
    this.postes = new Array<Poste>();

  }
  ngOnInit(): void {
    this.currentUser = new Utilisateur();
    this.Utilisateurservice.getByMail(localStorage.getItem('connectedUser')).subscribe((data) => {
      this.currentUser = data;
      this.poste.posteur =  this.currentUser;
      this.commentaire.commentateur = this.currentUser;
      console.log('current user ');
      console.log(this.currentUser);
    });
    this.getAllPostes();
    this.getUtilisateurActive();
  }
  getAllPostes(){
    this.posteservice.getAllPostes().subscribe((data) => {
      this.postes = data;
      console.log('les poste retournes ');
      console.log(data);
    });
  }
  onfileChange(files: FileList){
    this.file = files.item(0);
  }

  addPoste(){
    this.poste.etape ='poster';
    this.posteservice.addPoste(this.poste, this.file);
    this.ngOnInit()
  }
  domaineChange(event){
    this.poste.categorie = event.target.value;

  }
  Commentairechange(event) {
    this.commentaire.contenu = event.target.value;
  }

  addCommentaire(idPoste:number){
    console.log('commentaire commentateur ');
    console.log(this.commentaire.commentateur);

    this.commentaireservce.addCommentaire(idPoste, this.commentaire).subscribe((data) => {
      this.ngOnInit();
    })
  }

  getUtilisateurActive(){
    this.posteservice.getByOrderPostes().subscribe((data) => {
        this.utilisateursActifs =data;
    });
  }

  miseAjourPoste(poste:Poste){
    poste.etape="Financé par "+this.currentUser.entreprise;
    this.posteservice.miseAjourPoste(poste).subscribe(data => {
        console.log(poste);
      }
    );
  }
  getByPosteCategorie(categorie: String){

  }

}
