export class CreateDespesaDto {
    nomeDespesa: string;
    valor: number;
    categoria: number;
    formaPagamento: number;
    quantidadeParcelas?: number;
    dataVencimento: string;
    status: string;
    fixo?: boolean;
    parcelaAtual?: number;
    grupoParcelas: string;
}
