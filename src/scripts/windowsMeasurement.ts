import type { TWindow } from "./types";

export class ModernWindowMeasurements{
    type = "P-65"

    frameDiff= {
        base: 1.5,
        height: .13
    }

    panelDiff={
        jambas: 2.13,
        alfaisal: .57
    }

    glassDiff={
        base: 1.625,
        height: 5
    }

    base: number;
    height: number;
    panels: number;

    constructor(window: TWindow){
        this.base= window.base;
        this.height= window.height;
        this.panels= window.panels;
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

}



export class ClassicWindowMeasurements{
    type = "classic"

    frameDiff= {
        base: .25,
        height: .5
    }

    panelDiff={
        jambas: .88,
        alfaisal: .125
    }

    glassDiff={
        base: 1.330,
        height: 3.88
    }

    base: number;
    height: number;
    panels: number;

    constructor(window: TWindow){
        this.base= window.base;
        this.height= window.height;
        this.panels= window.panels;
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

}