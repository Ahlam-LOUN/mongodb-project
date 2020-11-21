import { Poste } from './poste';
export class Utilisateur{
     id_Utilisateur:string;
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