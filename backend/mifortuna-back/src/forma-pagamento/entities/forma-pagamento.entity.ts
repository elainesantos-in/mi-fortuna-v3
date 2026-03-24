import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';

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

    @ManyToOne(() => Usuario)
    usuario: Usuario;
}


