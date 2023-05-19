import { UniOp } from "./UniOp";
import { Visite } from "./Visite";

export class Employee{
    id:number;
    firstname:String;
    lastname:String;
    postetrav:String;
    matricule:number;
    daterecru:Date;
    datenai:Date;
    email:String;
    visites:Visite[]
    age:number;
    uniop:UniOp
    numdosmed:number;
    status:boolean;
    idOp:number;
}