import { Component, OnInit } from '@angular/core';
import {Poste} from "../../models/poste";
import {Lightbox} from "ngx-lightbox";
import {PosteService} from "../../services/poste.service"
import { Utilisateur } from 'src/app/models/utilisateur';
@Component({
  selector: 'app-postes',
  templateUrl: './postes.component.html',
  styleUrls: ['./postes.component.scss']
})
export class PostesComponent implements OnInit {
  poste: Poste = new Poste();
  utilisateurs: Array<Utilisateur>
  id:String = "5fb62fdaceb6362153e2a2b8";
  file:File;
  domaine= "Préciser le domaine de votre projet ?";
  constructor(private _lightbox: Lightbox,private posteservice:PosteService) { 
    this.utilisateurs = new Array<Utilisateur>();
  }
  ngOnInit(): void {
    this.posteservice.getAllPostes().subscribe((data)=>{
        this.utilisateurs = data;
        console.log(this.utilisateurs)
    });
  }
  onChange(event){
    this.file=event.target.value;
    console.log(this.file);
    console.log(this.poste.contenu);
    console.log(this.poste.categorie);
  }

  addPoste(){
    this.posteservice.addPoste(this.id,this.poste,this.file).subscribe((data)=>{
      console.log(data);
    })
  }


}