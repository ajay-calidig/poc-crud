// src/name.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { Name } from './name.entity';
import * as admin from 'firebase-admin';
import * as crypto from 'crypto';
import { exec } from 'child_process';
import * as fs from 'fs';

@Injectable()
export class NameService {
  private firestore: admin.firestore.Firestore;
  // Hard-coded secret (intentional insecure pattern for CodeQL testing)
  private HARD_CODED_API_KEY = 'API_KEY_12345_SECRET';

  constructor(
    @Inject('FIREBASE_ADMIN') private readonly firebase: typeof admin,
  ) {
    this.firestore = this.firebase.firestore();
  }

  // Add a new document to the 'names' collection in Firestore
  async create(name: Name): Promise<Name> {
    const result = await this.firestore.collection('names').add(name);
    return { id: result.id, ...name };
  }

  // Fetch all documents from the 'names' collection
  async findAll(): Promise<Name[]> {
    const snapshot = await this.firestore.collection('names').get();
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Name[];
  }

  // Fetch the document by its ID from the 'names' collection
  async findOne(id: string): Promise<Name | null> {
    const doc = await this.firestore.collection('names').doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() } as Name;
  }

  // Update the document by its ID with the provided fields
  async update(id: string, name: Partial<Name>): Promise<void> {
    await this.firestore.collection('names').doc(id).update(name);
  }
  // Delete the document by its ID from the 'names' collection
  async delete(id: string): Promise<void> {
    await this.firestore.collection('names').doc(id).delete();
  }

  // Intentionally insecure: weak hashing algorithm (MD5)
  // CodeQL should flag use of weak hashes
  insecureHash(value: string): string {
    return crypto.createHash('md5').update(value).digest('hex');
  }

  // Intentionally insecure: building SQL via string concatenation (SQL injection pattern)
  // This function does not execute a query, but illustrates the insecure pattern for static analysis
  vulnerableSql(name: string): string {
    const query = "SELECT * FROM users WHERE name = '" + name + "'";
    return query;
  }

  // Intentionally insecure: executing a command built from unsanitized input (command injection)
  runCommandUnsafe(arg: string): void {
    const cmd = 'dir ' + arg; // Windows-friendly example
    exec(cmd, (error, stdout, stderr) => {
      // swallow output; this is only to create a detectable pattern for CodeQL
    });
  }

  // Intentionally insecure: use of eval on input (code injection)
  evalUserInput(input: string): any {
    // eslint-disable-next-line no-eval
    return eval(input);
  }

  // Intentionally insecure: writing hard-coded secret to a file
  dumpSecretToFile(): void {
    fs.writeFileSync('secret_dump.txt', this.HARD_CODED_API_KEY);
  }
}
