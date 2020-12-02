import { Utilisateur } from './utilisateur';
export class Reaction{
   idReaction: number;
  dateReaction : String;
  type: string;
  reactif:Utilisateur =  new Utilisateur();
}
