import { ProyectoDto } from "./proyecto";

export interface MonitoreoDto {
    id?: number;
    proyecto?: ProyectoDto;
    autoevaluacion?: string;
    informe?: string;
    presupuestoInicial?: number;
    presupuestoFinal?: number;
}