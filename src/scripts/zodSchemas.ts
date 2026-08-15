import * as z from "zod";

export const WINDOW_SCHEMA = z.object({
    type: z.enum(["classic", "p-65"]),
    base: z.number({ error: "La base debe ser un número." }).min(0, { error: "La base no puede ser negativa." }),
    height: z.number({ error: "La altura debe ser un número." }).min(0, { error: "La altura no puede ser negativa." }),
    panels: z.number({ error: "Los paneles deben ser un número." }).int({ error: "Los paneles deben ser un número entero." }).min(2, { error: "Debe haber al menos 2 paneles." })
});

export const PROJECT_FORM_SCHEMA = z.object({
  title: z.string({ error: "El nombre del proyecto es requerido." }).min(4, { error: "El nombre del proyecto debe tener al menos 4 caracteres." }),
  startDate: z.date({ error: "La fecha de inicio debe ser una fecha válida." }),
  endDate: z.date({ error: "La fecha de fin debe ser una fecha válida." }).optional(),
  total: z.number({ error: "El total debe ser un número." }).min(0, { error: "El total no puede ser negativo." }).optional(),
});
