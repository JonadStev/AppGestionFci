export interface DashBloqueDto {
    labels?: string[];
    datasets?: DataSetDto;
}

export interface DataSetDto {
    label?: string;
    backgroundColor?: string;
    datasets?: number[];
}