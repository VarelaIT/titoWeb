import type { IWindow } from "./types";
import { ClassicWindowMeasurements, ModernWindowMeasurements } from "./windowsMessurement";

export function calcWindow(window: IWindow, modern: boolean){
    if (window.base && window.height && window.panels) {
        const base = parseFloat(window.base);
        const height = parseFloat(window.height);
        const panels = window.panels;
        if (Number.isNaN(base)) {
            console.error("Base is not a number:", base);
            return undefined;
        }
        if (Number.isNaN(height)) {
            console.error("Heigh is not a number:", height);
            return undefined;
        }
        if (Number.isNaN(panels)) {
            console.error("Panel is not a number:", panels);
            return undefined;
        }

        if(modern)
            return new ModernWindowMeasurements(base, height, panels)
        return new ClassicWindowMeasurements(base, height, panels)
    }

    console.error("Missing numbers", window);
    return undefined;
}