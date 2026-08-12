import { PRESETS_STORAGE } from "./presetStorage";
import { STORAGE_CONSTANTS, type IProject, type IStoredProject, type TWindow } from "./types";
import { WindowMeasurements } from "./windowsMeasurement";
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


export function printProject(project: IProject) {
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
                table {
                  border-collapse: collapse;
                  width: 100%;
                }
                th, td {
                  border: 1px solid ;
                  padding: 4px;
                }
                th {
                  border: 1px solid ;
                  padding: 8px;
                }
                tr:nth-child(odd) {
                  background-color: #f2f2f2;
                }
                thead tr:nth-child(odd) {
                  background-color: #fff;
                }
            </style>
        </head>
        <body>
            <header>
                <h1>${project.title}</h1>
                <p>Fecha de Entrega: ${project.endDate?.toLocaleDateString("es-ES")}</p>
                <p>Total: RD${new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(project.total)}</p>
                <p><b>VentARELA</b></p>
            </header>
            <main>
                <article className={
                    "grid gap-4 py-4 translate-x-2 "
                    + animation
                }>
                    <table id="table-container">
                      <thead>
                        <tr>
                          <th>Tipo</th>
                          <th>Base</th>
                          <th>Altura</th>
                          <th>Rieles</th>
                          <th>Laterales</th>
                          <th>Afaisal</th>
                          <th>Jambas</th>
                          <th>Cristal</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${project.items?.map(item => `
                          <tr>
                            <td style="font-weight: 600">${item.type}</td>
                            <td style="font-style: italic; font-size: 14px">${item.base.toFixed(2)}</td>
                            <td style="font-style: italic; font-size: 14px">${item.height.toFixed(2)}</td>
                            <td>${item.getRails().toFixed(2)}</td>
                            <td>${item.getLaterals().toFixed(2)}</td>
                            <td>${item.getAlfaisal().toFixed(2)}</td>
                            <td>${item.getJambas().toFixed(2)}</td>
                            <td>${item.getGlassBase().toFixed(2)} x ${item.getGlassHeigth().toFixed(2)}</td>
                          </tr>
                        `).join("")}
                      </tbody>
                    </table>
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

export function loadProject(key?: string): IProject {
  const stored = (key
    ? PRESETS_STORAGE.find(STORAGE_CONSTANTS.PROJECTS, key)
    : PRESETS_STORAGE.get(STORAGE_CONSTANTS.PROJECTS)?.pop()?.value) as IStoredProject | undefined;

  if (stored) {
    return {
      projectId: stored.projectId,
      title: stored.title,
      startDate: new Date(stored.startDate),
      endDate: stored.endDate ? new Date(stored.endDate) : undefined,
      total: stored.total,
      items: stored.items?.map((item: TWindow) => new WindowMeasurements(item)),
    };
  }
  return { projectId: Date.now().toString(), title: "Sin Titulo", startDate: new Date(), total: 0, items: []};
}

export interface IPromptProps{
  content: { title: string; message: string};
  variant?: string;
  onAccept?: () => void;
  onCancel?: () => void;
}
