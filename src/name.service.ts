// src/name.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { Name } from './name.entity';
import * as admin from 'firebase-admin';

@Injectable()
export class NameService {
  private firestore: admin.firestore.Firestore;

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
}
