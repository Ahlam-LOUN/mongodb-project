import { Commentaire } from "./commentaire";
import { Reaction } from "./reaction";

export class Poste{
    datePoste:String;
    contenu:String;
    lien:String;
    type: String;
    categorie:String;
    commentaires: Commentaire[];
    reactions:Reaction[];
    fichierNom:String;

}
