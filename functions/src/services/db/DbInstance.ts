import { initializeApp } from "firebase/app";
import {getFirestore, Firestore, setDoc, doc, query, collection, where, getDocs, orderBy, limit} from "firebase/firestore";
import {firebaseConfig} from "../../config";
import {IEventData, TelegrafContext} from "../../types";
import {v4 as uuidv4} from "uuid";

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

  async findEvents(ctx: TelegrafContext): Promise<IEventData[]> {
    // Construct Firestore query
    const q = query(collection(this.db, "events"),
      where('startDate', '>=', ctx.scene.session.search.startDate),
      where('startDate', '<=', ctx.scene.session.search.endDate), orderBy('startDate'), limit(50));
    const events: IEventData[] = [];
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(doc => {
      // doc.data() is never undefined for query doc snapshots
      const eventData: IEventData = {
        name: doc.data().name,
        startDate: doc.data().startDate.toDate(),
        endDate: doc.data().endDate ? doc.data().endDate.toDate() : doc.data().endDate,
        multiday: doc.data().multiday,
        location: doc.data().location,
        file: doc.data().file,
        description: doc.data().description
      }
      events.push(eventData);
    });

    return events;
  }
}