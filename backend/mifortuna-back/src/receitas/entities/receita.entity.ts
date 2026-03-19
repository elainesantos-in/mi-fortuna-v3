import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Receita {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column('decimal', { precision: 10, scale: 2 })
    valorSalario: number;

    @Column({ default: true })
    ativo: boolean;
}
