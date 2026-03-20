import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormaPagamentoService } from './forma-pagamento.service';
import { FormaPagamentoController } from './forma-pagamento.controller';
import { FormaPagamento } from './entities/forma-pagamento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FormaPagamento])],
  controllers: [FormaPagamentoController],
  providers: [FormaPagamentoService],
})
export class FormaPagamentoModule {}
