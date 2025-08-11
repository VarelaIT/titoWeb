import { useMemo, useState } from "react";
import { Input } from "../elements/inputs";
import { Page } from "../elements/pages";
import type { IWindowInputs } from "../../scripts/types";
import { Button } from "../elements/buttons";
import { Sigma } from "lucide-react";
import { calcWindow } from "../../scripts/utils";
import { WINDOW_SCHEMA } from "../../scripts/zodSchemas";
import * as z from "zod";
import type { ClassicWindowMeasurements } from "../../scripts/windowsMeasurement";

export function WindowCalculator({modern}: {modern:boolean}){
    const [window, setWindow] = useState<IWindowInputs>({base: undefined, height: undefined, panels: "2"});
    const [details, setDetails] = useState<ClassicWindowMeasurements | undefined>(undefined);
    const [slideIn, setSlideIn] = useState(true);

    useMemo(()=> setDetails(undefined), [modern]);

    const Resume = useMemo(()=> {
        const animation = slideIn? "motion-opacity-in-0 motion-translate-y-in-100 motion-blur-in-md " : "";
        if(details){ 

            return <article className={
                "grid gap-4 py-4 translate-x-2 "
                + animation
            }>
                <p className="col-span-full">
                    Medidas resultantes de marco de base <b>{details.base} </b>
                    y altura <b>{details.height}</b> para una ventana de  {details.panels} paneles.
                </p>
                <p className="grid gap-4 grid-cols-2">
                    <span className="text-right">Rieles</span>
                    <b>{details.getRails().toFixed(2)}</b>
                </p>
                <p className="grid gap-4 grid-cols-2">
                    <span className="text-right">Laterales</span>
                    <b>{details.getLaterals().toFixed(2)}</b>
                </p>
                <p className="grid gap-4 grid-cols-2">
                    <span className="text-right">Afaisal y cabezal</span>
                    <b >{details.getAlfaisal().toFixed(2)}</b>
                </p>
                <p className="grid gap-4 grid-cols-2">
                    <span className="text-right">Jambas</span>
                    <b >{details.getJambas().toFixed(2)}</b>
                </p>
                <p className="grid gap-4 grid-cols-2">
                    <span className="text-right">Base de los cristales</span>
                    <b >{details.getGlassBase().toFixed(2)}</b>
                </p>
                <p className="grid gap-4 grid-cols-2">
                    <span className="text-right">Altura de los cristales</span>
                    <b >{details.getGlassHeigth().toFixed(2)}</b>
                </p>
            </article>
        }
        return undefined;
    }, [details, slideIn]);

    return (
        <Page>
            <h2 className="font-bold text-xl">Ventana {modern? "Moderna" : "Tradicional"}</h2>
            <div className="overflow-hidden">
                {Resume&& Resume}
            </div>
            <article className="grid gap-4 py-4">
                <p>
                    <label className={`grid grid-cols-4 gap-2`}>
                        <span className="text-md col-span-1 text-right">Base</span>
                        <Input 
                            className="col-span-3"
                            inputMode="decimal" 
                            placeHolder="Base del rectangulo" 
                            required 
                            pattern="\d{1,4}|\d{1,4}\.|\d{1,4}\.\d{1,2}" 
                            value={window.base}
                            onChange={(e)=> {
                                setSlideIn(false)
                                setWindow({...window, base: e.target.value})
                            }}
                        />
                    </label>
                </p>

                <p>
                    <label className={`grid grid-cols-4 gap-2`}>
                        <span className="text-md col-span-1 text-right">Altura</span>
                        <Input 
                            className="col-span-3"
                            inputMode="decimal" 
                            placeHolder="Altura del rectangulo" 
                            required 
                            pattern="\d{1,4}|\d{1,4}\.|\d{1,4}\.\d{1,2}" 
                            value={window.height}
                            onChange={(e)=> {
                                setSlideIn(false)
                                setWindow({...window, height: e.target.value})
                            }}
                        />
                    </label>
                </p>

                <p>
                    <label className={`grid grid-cols-4 gap-2`}>
                        <span className="text-md col-span-1 text-right">Paneles</span>
                        <Input 
                            className="col-span-3"
                            inputMode="decimal" 
                            placeHolder="Cantidad de paneles" 
                            required 
                            pattern="\d" 
                            value={window.panels}
                            onChange={(e)=> {
                                setSlideIn(false)
                                setWindow({...window, panels: e.target.value});
                            }}
                        />
                    </label>
                </p>

                <Button
                    onClick={()=> {
                        const newWindow = {
                            base: parseFloat(window.base?? ""),
                            height: parseFloat(window.height?? ""),
                            panels: parseInt(window.panels?? ""),
                        }
                        try{
                        setDetails(calcWindow(WINDOW_SCHEMA.parse(newWindow), modern))
                        setSlideIn(true)
                        }catch(error){
                            if(error instanceof z.ZodError){
                                console.error("zod error: ", error.message)
                                setDetails(undefined);
                                setSlideIn(false);
                            }
                        }
                    }}
                >
                    <span className="flex gap-2">
                        <Sigma />
                        <span>Ejecutar Calculo</span>
                    </span>
                </Button> 
            </article>
        </Page>
    )
}