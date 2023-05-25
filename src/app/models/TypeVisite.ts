import { Color } from "./Color";
import { Visite } from "./Visite";

export class TypeVisite{
    id:number;
    frequence:number;
    type:String;
    color:Color;
    primaryVisites:Visite [];
    seocndaryVisites:Visite [];
    active:boolean
}