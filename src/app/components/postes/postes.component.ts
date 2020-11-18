import { Component, OnInit } from '@angular/core';
import {Poste} from "../../models/poste";
import {Lightbox} from "ngx-lightbox";

@Component({
  selector: 'app-postes',
  templateUrl: './postes.component.html',
  styleUrls: ['./postes.component.scss']
})
export class PostesComponent implements OnInit {
  poste: Poste;
  constructor(private _lightbox: Lightbox) { }
  domaine= "Préciser le domaine de votre projet ?";
  ngOnInit(): void {
  }
  select (event: any) {
    //update the ui
    console.log(event.target.value);
  }
}
