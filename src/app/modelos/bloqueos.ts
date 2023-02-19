export interface BloqueoDto {
    id?: number;
    usuario?: string;
    estadoR1?: string;
    fechaPrimeraRevision?: string;
    estadoR2?: string;
    fechaSegundaRevision?: string;
    motivo?: string;
    dias?: number;
    bloque?: number
    cuenta?: number
}