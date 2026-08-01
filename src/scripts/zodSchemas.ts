import * as z from "zod";

export const WINDOW_SCHEMA = z.object({
    type: z.enum(["classic", "p-65"]),
    base: z.number({ error: "La base debe ser un número." }).min(0, { error: "La base no puede ser negativa." }),
    height: z.number({ error: "La altura debe ser un número." }).min(0, { error: "La altura no puede ser negativa." }),
    panels: z.number({ error: "Los paneles deben ser un número." }).int({ error: "Los paneles deben ser un número entero." }).min(2, { error: "Debe haber al menos 2 paneles." })
});
