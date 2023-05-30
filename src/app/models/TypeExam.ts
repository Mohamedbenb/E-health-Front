import { Color } from "./Color";
import { Examen } from "./Examen";

export class TypeExam{
    id:number;
    type:string;
    frequence:number;
    recommandation:number;
    exams:Examen[];
    color:Color;
    active:boolean;
    

}