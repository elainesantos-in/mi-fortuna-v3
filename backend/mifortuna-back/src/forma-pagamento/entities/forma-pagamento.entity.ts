import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class FormaPagamento {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    tipoPagamento: string;

    @Column({ default: true })
    ativo: boolean;
}


