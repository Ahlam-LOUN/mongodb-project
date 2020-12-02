import { Poste } from './poste';
export class Utilisateur{
	active:boolean;
	idUtilisateur:number;
	 nom:string;
	 datePoste:String;
	 prenom:string;
	 mail:string;
	 password:string;
	 telephone:string;
	 universite:string;
     niveau:string;
     entreprise:string;
	 postes:  Poste[] ;

}
