import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { BlessingModule } from './blessing/blessing.module';
import { Blessing } from './blessing/blessing.entity';
import { Event } from './event/event.entity';
import { EventModule } from './event/event.module';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { PaymentModule } from './payment/payment.module';
import { Payment } from './payment/payment.entity';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
import { AppService } from './app.service';
import { AuthGuard } from './guards/auth.guard';
import * as winston from 'winston';
import { WinstonModule } from 'nest-winston';
import { InternalServerErrorFilter } from './filters/internal-errors.filter';

const cookieSession = require('cookie-session');

@Module({
  imports: [
    EventModule,
    BlessingModule,
    UserModule,
    AuthModule,
    PaymentModule,
    WinstonModule.forRoot({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      exitOnError: false,
      transports: [
        new winston.transports.File({
          dirname: 'logs',
          filename: 'errors.log',
          level: 'error',
        }),
      ],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        // const url = config.get<string>('DATABASE_URL');
        return {
          type: 'postgres',
          port: config.get('POSTGRES_PORT') ?? 5432,
          username: config.get('POSTGRES_USER'),
          password: config.get('POSTGRES_PASSWORD'),
          synchronize: true,
          ssl: false,
          entities: [Blessing, Event, User, Payment],
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ whitelist: true }),
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: InternalServerErrorFilter
    }
  ],
})
export class AppModule {
  constructor(private configService: ConfigService) { }

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: [this.configService.get('COOKIE_KEY')],
        }),
      )
      .forRoutes('*');
  }
}
