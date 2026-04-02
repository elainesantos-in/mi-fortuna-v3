export class CreateDespesaDto {
    nomeDespesa: string;
    valor: number;
    categoria: number;
    formaPagamento: number;
    recorrencia: string;
    quantidadeParcelas: number;
    dataVencimento: string;
    status: string;
    fixo?: boolean;
}
