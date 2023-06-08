import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import path from 'path';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { AdminModule } from './modules/admin/admin.module';
import { CommonModule } from './modules/common/common.module';
import { SectionModule } from './modules/section/section.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config.db.host,
      port: config.db.port,
      username: config.db.user,
      password: config.db.password,
      database: config.db.database,
      entities: [path.normalize(__dirname + '/db/entities/**/*.{ts,js}')],
      migrations: [path.normalize(__dirname + '/db/migrations/*.{js,ts}')],
      migrationsTableName: 'migrations',
      synchronize: false,
      namingStrategy: new SnakeNamingStrategy(),
    }),
    RedisModule.forRoot({
      config: {
        url: config.server.redisUrl,
      },
    }),
    UserModule,
    AuthModule,
    CommonModule,
    AdminModule,
    SectionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
