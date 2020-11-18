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
  poste: Poste;
  utilisateurs: Array<Utilisateur>
  constructor(private _lightbox: Lightbox,private posteservice:PosteService) { 
    this.utilisateurs = new Array<Utilisateur>();
  }

  ngOnInit(): void {
    this.posteservice.getAllPostes().subscribe((data)=>{
        this.utilisateurs = data;
    });
  
  }
  f(){
    this.utilisateurs.forEach(element => {
      console.log(element.id_Utilisateur)
    });
  }

}
