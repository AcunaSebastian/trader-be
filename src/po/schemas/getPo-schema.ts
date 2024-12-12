import { z } from "zod";

export const getPoSchema = z.object({
  limit: z.number().min(1).max(100),
  page: z.number().min(1),
});
