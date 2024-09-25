// src/firebase/firebase.module.ts
import { Module } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [
    {
      provide: 'FIREBASE_ADMIN',
      useFactory: () => {
        // Initializes Firebase Admin SDK with service account credentials
        admin.initializeApp({
          credential: admin.credential.cert(
            require('../../firebase-service-account.json'),
          ),
        });
        return admin;
      },
    },
  ],
  exports: ['FIREBASE_ADMIN'],
})
export class FirebaseModule {}
