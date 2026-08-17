import type { IFrameDiff, IGlassDiff, IPanelDiff, TWindow } from "./types";

export class ModernWindowMeasurements{

    static frameDiff: IFrameDiff= {
        base: 1.5,
        height: .13
    }

    static panelDiff: IPanelDiff={
        jambas: 2.13,
        alfaisal: .57
    }

    static glassDiff: IGlassDiff={
        base: 1.625,
        height: 5
    }

}



export class ClassicWindowMeasurements{

    static frameDiff: IFrameDiff= {
        base: .25,
        height: .5
    }

    static panelDiff: IPanelDiff={
        jambas: .88,
        alfaisal: .125
    }

    static glassDiff: IGlassDiff={
        base: 1.330,
        height: 3.88
    }

}

export class WindowMeasurements{

    frameDiff: IFrameDiff;
    panelDiff: IPanelDiff;
    glassDiff: IGlassDiff;

    type: TWindow["type"];
    base: number;
    height: number;
    panels: number;

    constructor(window: TWindow){
        this.type= window.type;
        this.base= window.base;
        this.height= window.height;
        this.panels= window.panels;
        if(window.type === "p-65"){
            this.frameDiff = ModernWindowMeasurements.frameDiff;
            this.panelDiff = ModernWindowMeasurements.panelDiff;
            this.glassDiff = ModernWindowMeasurements.glassDiff;
        }else{
            this.frameDiff = ClassicWindowMeasurements.frameDiff;
            this.panelDiff = ClassicWindowMeasurements.panelDiff;
            this.glassDiff = ClassicWindowMeasurements.glassDiff;
        }
    }

    getRails(){
        return this.base - this.frameDiff.base;
    }

    getLaterals(){
        return this.height - this.frameDiff.height;
    }

    getAlfaisal(){
        return (this.base - (this.panelDiff.alfaisal * this.panels)) / this.panels;
    }

    getJambas(){
        return this.height - this.panelDiff.jambas;
    }

    getGlassBase(){
        return (this.getRails() - this.glassDiff.base - (this.glassDiff.base * this.panels)) / this.panels;
    }

    getGlassHeigth(){
        return this.height - this.glassDiff.height;
    }

    getGlassDimentions(){
        return this.getGlassBase().toFixed(2) + " x " + this.getGlassHeigth().toFixed(2);
    }

}