import * as z from "zod";

export const WINDOW_SCHEMA = z.object({
    base: z.number().min(0),
    height: z.number().min(0),
    panels: z.number().int().min(2)
});