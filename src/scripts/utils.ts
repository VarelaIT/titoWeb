import type { TWindow } from "./types";
import { ClassicWindowMeasurements, ModernWindowMeasurements } from "./windowsMeasurement";

export function calcWindow(window: TWindow, modern: boolean){
    if(modern)
        return new ModernWindowMeasurements(window);
    return new ClassicWindowMeasurements(window);
}