import { getAllPots } from "@/services/pots/getAllPots";
import { getAllThemes } from "@/services/themes/getAllThemes";

export type Pot = Awaited<ReturnType<typeof getAllPots>>[number];

export type Theme = Awaited<ReturnType<typeof getAllThemes>>[number];
