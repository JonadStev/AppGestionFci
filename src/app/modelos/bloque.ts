import { CuentaDto } from "./cuenta";

export interface BloqueDto {
    id?: number,
    nombre?: string,
    estado?: string,
    cuentas?: CuentaDto[]
}