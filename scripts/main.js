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
        <p>Rieles: ${glass.getRails().toFixed(2)}</p>
        <p>Laterales: ${glass.getLaterals().toFixed(2)}</p>
        <p>Afaisal y cabezal: ${glass.getAlfaisal().toFixed(2)}</p>
        <p>Jambas: ${glass.getJambas().toFixed(2)}</p>
        <p>Base de los cristales: ${glass.getGlassBase().toFixed(2)}</p>
        <p>Altura de los cristales: ${glass.getGlassHeigth().toFixed(2)}</p>
    `;
}

class MeasureGlassWindow{
    frameDiff= {
        base: .25,
        heigth: .5
    }

    panelDiff={
        jambas: .75,
        alfaisal: .25
    }

    glassDiff={
        base: 1.415,
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
