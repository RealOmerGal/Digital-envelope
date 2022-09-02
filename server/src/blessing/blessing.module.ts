import { CacheModule, Module } from '@nestjs/common';
import { BlessingService } from './blessing.service';
import { BlessingController } from './blessing.controller';
import { Blessing } from './blessing.entity';
import * as redisStore from 'cache-manager-redis-store';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentModule } from '../payment/payment.module';


@Module({
  imports: [TypeOrmModule.forFeature([Blessing]), PaymentModule, CacheModule.register({
    store: redisStore,
    host: process.env.REDIS_HOST ?? 'localhost',
    port: process.env.REDIS_PORT ?? '6379',
    ttl: 60 * 30,
  })],
  controllers: [BlessingController],
  providers: [BlessingService],

})


export class BlessingModule { }
