import { Poste } from './poste';
export class Utilisateur{
     idUtilisateur:number;
     nom:string;
	   prenom:string;
	   mail:string;
	   password:string;
	   telephone:string;
	   universite:string;
     niveau:string;
     active:boolean;
     entreprise:string;
	   postes:  Poste[] ;

}
