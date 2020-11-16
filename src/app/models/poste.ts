import { Commentaire } from "./commentaire";
import { Reaction } from "./reaction";

export class Poste{
    contenu:string;
    lien:string;  
    categorie:string;
    commentaires: Commentaire[];
    reactions:Reaction[];
}