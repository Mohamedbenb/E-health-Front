import { Visite } from "./Visite";

export class TypeVisite{
    id:number;
    frequence:number;
    type:String;
    color:String;
    primaryVisites:Visite [];
    seocndaryVisites:Visite [];
    active:boolean
}