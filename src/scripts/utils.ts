import type { IWindow } from "./types";
import { ClassicWindowMeasurements } from "./windowsMessurement";

export function calcClassicWindow({base, height, panels}: IWindow){
    if(!base || Number.isNaN(base)){
        console.error("Base is not defined:", base);
        return undefined;
    }
    if(!height || Number.isNaN(height)){
        console.error("Heigh is not defined:", height);
        return undefined;
    }
    if(!panels || Number.isNaN(panels)){
        console.error("Panel is not defined:", panels);
        return undefined;
    }

    return new ClassicWindowMeasurements(base, height, panels)
}