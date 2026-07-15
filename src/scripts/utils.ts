import type { TWindow } from "./types";
import { ClassicWindowMeasurements, ModernWindowMeasurements, WindowMeasurements } from "./windowsMeasurement";
import Papa, { type UnparseObject } from 'papaparse';

export function calcWindow(window: TWindow){
    return new WindowMeasurements(window);
}

const fileHeaders = {
    es: {
        window: [
            "Ventana",
            "Dimensiones",
            "Rieles",
            "Laterales",
            "Afaisal y cabezal",
            "Jambas",
            "Base de los cristales",
            "Altura de los cristales",
        ],
        details: [
            "Trabajo",
            "Fecha",
            "Monto"
        ]
    }
}
export function exportProject(project: Array<WindowMeasurements>, description: {title: string, date: string, total: string}): string{
    const conf: UnparseObject<unknown>= {
        fields: fileHeaders.es.window,
        data: project.map((win)=> {
            return [
                win.type,
                win.base + " X " + win.height,
                win.getRails(),
                win.getLaterals(),
                win.getAlfaisal(),
                win.getJambas(),
                win.getGlassBase(),
                win.getGlassHeigth(),
            ]
        })
    };

    const details = [
        ["..."], 
        fileHeaders.es.details,
        [
            description.title,
            description.date,
            description.total,
        ]
    ]

    conf.data = [...conf.data, ...details];
    
    return Papa.unparse(conf);
}

export function printWindow(wm: WindowMeasurements, modern: boolean){
    const printWindow = window.open("", "_blank");

    if(printWindow){
        printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>VentARELA</title>
            <style>
                body {
                    font-family: Arial, Helvetica, sans-serif;
                    text-align: center;
                    margin: 40px;
                }

                h1, p {
                    margin: 0.5em 0;
                }
            </style>
        </head>
        <body>
            <header>
                <h1>VentARELA</h1>
                <p></p>
            </header>
            <main>
                <article className={
                    "grid gap-4 py-4 translate-x-2 "
                    + animation
                }>
                    <p className="col-span-full">
                        Medidas resultantes de marco de ventana <b>${modern? "P-65" : "Tradicional"}</b> de base <b>${wm.base} </b>
                        y altura <b>${wm.height}</b> para una ventana de  ${wm.panels} paneles.
                    </p>
                    <p className="grid gap-4 grid-cols-2">
                        <span className="text-right">Rieles</span>
                        <b>${wm.getRails().toFixed(2)}</b>
                    </p>
                    <p className="grid gap-4 grid-cols-2">
                        <span className="text-right">Laterales</span>
                        <b>${wm.getLaterals().toFixed(2)}</b>
                    </p>
                    <p className="grid gap-4 grid-cols-2">
                        <span className="text-right">Afaisal y cabezal</span>
                        <b >${wm.getAlfaisal().toFixed(2)}</b>
                    </p>
                    <p className="grid gap-4 grid-cols-2">
                        <span className="text-right">Jambas</span>
                        <b >${wm.getJambas().toFixed(2)}</b>
                    </p>
                    <p className="grid gap-4 grid-cols-2">
                        <span className="text-right">Base de los cristales</span>
                        <b >${wm.getGlassBase().toFixed(2)}</b>
                    </p>
                    <p className="grid gap-4 grid-cols-2">
                        <span className="text-right">Altura de los cristales</span>
                        <b >${wm.getGlassHeigth().toFixed(2)}</b>
                    </p>
                </article>
            </main>
        </body>
        </html>
        `);

        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
    }
}