import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    dataNascimento: string;

    @Column({unique: true })
    email: string;

    @Column()
    senha: string;

    @Column({ default: true })
    ativo: boolean;
    
}
