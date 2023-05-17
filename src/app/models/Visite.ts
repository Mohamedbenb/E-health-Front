import { Employee } from "./Employee";
import { TypeVisite } from "./TypeVisite";

export class Visite{
    id:number;
    recommandatio:String;
    employee:Employee;
    primaryType:TypeVisite;
    secondaryType:TypeVisite;
    valid:boolean;
    active:boolean;
    matsoc:number;
}