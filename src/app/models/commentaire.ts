import { Utilisateur } from './utilisateur';
export class Commentaire{
    idCommentaire: number;
    contenu: String;
    commentateur: Utilisateur = new Utilisateur();
    dateCommentaire: String;
}
