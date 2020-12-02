import { Commentaire } from './commentaire';
import { Reaction } from './reaction';
import {Utilisateur} from './utilisateur';

export class Poste{
    idPoste: number;
    etape: String;
    datePoste: String;
    contenu: String;
    lien: String;
    type: String;
    categorie: String;
    posteur: Utilisateur = new Utilisateur();
    commentaires: Array<Commentaire> = new Array<Commentaire>();
    reactions: Array<Reaction> = new Array<Reaction>();
    financieurs:Array<Utilisateur> = new Array<Utilisateur>();
    fichierNom:String;
}
