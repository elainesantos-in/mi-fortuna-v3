import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { Categoria } from 'src/categorias/entities/categoria.entity';
import { FormaPagamento } from 'src/forma-pagamento/entities/forma-pagamento.entity';

@Entity()
export class Despesa {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nomeDespesa: string;

    @Column('decimal', {precision:10, scale:2})
    valor: number;

    @ManyToOne(() => Categoria)
    categoria: Categoria;

    @ManyToOne(() => FormaPagamento)
    formaPagamento: FormaPagamento;

    @Column({ nullable: true })
    quantidadeParcelas: number;

    @Column({ type: 'date', nullable: true })
    dataVencimento: Date;

    @Column()
    status: string;
    
    @Column({ default: false })
    fixo: boolean;

    @Column({ nullable: true })
    parcelaAtual: number;

    @Column({ nullable: true })
    grupoParcelas: string;

    @ManyToOne(() => Usuario)
    usuario: Usuario;
}
