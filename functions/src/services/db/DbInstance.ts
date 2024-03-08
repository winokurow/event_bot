import { initializeApp } from "firebase/app";
import {getFirestore, Firestore, setDoc, doc} from "firebase/firestore";
import {firebaseConfig} from "../../config";
import {TelegrafContext} from "../../types";
import {v4 as uuidv4} from 'uuid';

export class DbInstance {
  private static instance: DbInstance;

  db: Firestore;

  constructor() {

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);


    // Initialize Cloud Firestore and get a reference to the service
    this.db = getFirestore(app);

  }

  static getInstance(): DbInstance {
    if (!DbInstance.instance) {
      DbInstance.instance = new DbInstance();
    }

    return DbInstance.instance;
  }

  async addEvent(ctx: TelegrafContext): Promise<void> {
    await setDoc(doc(this.db, "events", uuidv4()), {...ctx.scene.session.add});
  }

}