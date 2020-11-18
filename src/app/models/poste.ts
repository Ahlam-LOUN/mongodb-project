import { Commentaire } from "./commentaire";
import { Reaction } from "./reaction";

export class Poste{
    datePoste:String;
    contenu:string;
    lien:string;
    type: string;
    categorie:string;
    commentaires: Commentaire[];
    reactions:Reaction[];
   
    

}
