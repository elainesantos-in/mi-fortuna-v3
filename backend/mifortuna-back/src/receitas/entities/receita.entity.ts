import { Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';

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

    @ManyToOne(() => Usuario)
    usuario: Usuario;
}
