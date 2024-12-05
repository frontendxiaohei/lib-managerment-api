import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DbModule } from './db/db.module';
import { BookModule } from './book/book.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [UserModule, DbModule, BookModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../','uploads'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
