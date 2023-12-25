const container= document.querySelector('#container');
const rectangleForm= document.querySelector('#rectangle-form');
const glassContainer= document.querySelector('#glass-container');

rectangleForm.addEventListener('submit', (event)=>{
    event.preventDefault();
    const base= parseFloat(rectangleForm.base.value);
    const heigth= parseFloat(rectangleForm.heigth.value);
    const panels= parseInt(rectangleForm.panels.value);

    const glass= new MeasureGlassWindow(base, heigth, panels);

    printGlass(glass);
});

//hello

function printGlass(glass){
    glassContainer.innerHTML= `
        <p>Rieles: <strong style="color: gray;">${glass.getRails().toFixed(2)}</strong></p>
        <p>Laterales: <strong style="color: gray;">${glass.getLaterals().toFixed(2)}</strong></p>
        <p>Afaisal y cabezal: <strong style="color: green;">${glass.getAlfaisal().toFixed(2)}</strong></p>
        <p>Jambas: <strong style="color: green;">${glass.getJambas().toFixed(2)}</strong></p>
        <p>Base de los cristales: <strong style="color: blue;">${glass.getGlassBase().toFixed(2)}</strong></p>
        <p>Altura de los cristales: <strong style="color: blue;">${glass.getGlassHeigth().toFixed(2)}</strong></p>
    `;
}

class MeasureGlassWindow{
    frameDiff= {
        base: .25,
        heigth: .5
    }

    panelDiff={
        jambas: .75,
        alfaisal: .125
    }

    glassDiff={
        base: 1.25,
        heigth: 3.875
    }

    constructor(base, heigth, panels){
        this.base= base;
        this.heigth= heigth;
        this.panels= panels;
    }

    getRails(){
        return this.base - this.frameDiff.base;
    }

    getLaterals(){
        return this.heigth - this.frameDiff.heigth;
    }

    getAlfaisal(){
        return (this.base - (this.panelDiff.alfaisal * this.panels)) / this.panels;
    }

    getJambas(){
        return this.heigth - this.panelDiff.jambas;
    }

    getGlassBase(){
        return (this.getRails() - this.glassDiff.base - (this.glassDiff.base * this.panels)) / this.panels;
    }

    getGlassHeigth(){
        return this.heigth - this.glassDiff.heigth;
    }

}
