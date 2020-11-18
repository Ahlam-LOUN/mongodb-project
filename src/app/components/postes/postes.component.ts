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

  ngOnInit(): void {
  }

}
