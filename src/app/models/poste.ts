import { Commentaire } from "./commentaire";
import { Reaction } from "./reaction";
import {Utilisateur} from "./utilisateur";

export class Poste{
    idPsote: number;
    etape:String;
    datePoste:String;
    contenu:String;
    lien:String;
    type: String;
    categorie:String;
    commentaires: Array<Commentaire> = new Array<Commentaire>();
    reactions:Array<Reaction> = new Array<Reaction>();
    posteur: Utilisateur;
    fichierNom:String;
}
