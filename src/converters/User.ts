// named imports
import { LanguageSupported } from '@/store/store'
import { db } from '../../firebase'
import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  collection,
  collectionGroup,
  doc,
  limit,
  orderBy,
  query,
  where
} from 'firebase/firestore'
import { User } from 'next-auth'

const usserConverter: FirestoreDataConverter<User> = {
  toFirestore: function (customer: User): DocumentData {
    return {
      input: customer.email,
      timestamp: customer.name,
      user: customer.image,
    }
  },
  fromFirestore: function (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): User {
    const data = snapshot.data(options)

    return {
      id: snapshot.id,
      email: data.email,
      name: data.name,
      image: data.image,
    }
  }
}

export const getUserByEmailRef = (email: string) =>
  query(collection(db, 'users'), where("email", "==", email)).withConverter(usserConverter)