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


function printGlass(glass){
    glassContainer.innerHTML= `
        <p>Rieles: ${glass.getRails()}</p>
        <p>Laterales: ${glass.getLaterals()}</p>
        <p>Afaisal y cabesal: ${glass.getAlfaisal()}</p>
        <p>Jambas: ${glass.getJambas()}</p>
        <p>Base de los cristales: ${glass.getGlassBase()}</p>
        <p>Altura de los cristales: ${glass.getGlassHeigth()}</p>
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
