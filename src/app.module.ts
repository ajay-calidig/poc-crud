// src/app.module.ts
import { Module } from '@nestjs/common';
import { FirebaseModule } from './firebase/firebase.module';
import { NameController } from './name.controller';
import { NameService } from './name.service';

@Module({
  imports: [FirebaseModule],
  controllers: [NameController],
  providers: [NameService],
})
export class AppModule {}
