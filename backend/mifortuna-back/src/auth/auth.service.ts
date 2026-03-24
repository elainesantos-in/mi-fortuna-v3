import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../usuarios/usuarios.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
     constructor(
        private usuariosService: UsuariosService,
        private jwtService: JwtService,
    ) {}

    async login(email: string, senha: string){
        const usuario = await this.usuariosService.findByEmail(email);

        if (!usuario){
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida){
             throw new UnauthorizedException('Credenciais inválidas');
        }

        const payload = { sub: usuario.id, email: usuario.email };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
