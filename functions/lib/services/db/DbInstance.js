"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbInstance = void 0;
const app_1 = require("firebase/app");
const firestore_1 = require("firebase/firestore");
const config_1 = require("../../config");
const uuid_1 = require("uuid");
class DbInstance {
    constructor() {
        // Initialize Firebase
        const app = (0, app_1.initializeApp)(config_1.firebaseConfig);
        // Initialize Cloud Firestore and get a reference to the service
        this.db = (0, firestore_1.getFirestore)(app);
    }
    static getInstance() {
        if (!DbInstance.instance) {
            DbInstance.instance = new DbInstance();
        }
        return DbInstance.instance;
    }
    async addEvent(ctx) {
        await (0, firestore_1.setDoc)((0, firestore_1.doc)(this.db, "events", (0, uuid_1.v4)()), Object.assign({}, ctx.scene.session.add));
    }
    async findEvents(ctx) {
        // Construct Firestore query
        const q = (0, firestore_1.query)((0, firestore_1.collection)(this.db, "events"), (0, firestore_1.where)('startDate', '>=', ctx.scene.session.search.startDate), (0, firestore_1.where)('startDate', '<=', ctx.scene.session.search.endDate), (0, firestore_1.orderBy)('startDate'), (0, firestore_1.limit)(50));
        const events = [];
        const querySnapshot = await (0, firestore_1.getDocs)(q);
        querySnapshot.forEach(doc => {
            // doc.data() is never undefined for query doc snapshots
            const eventData = {
                name: doc.data().name,
                startDate: doc.data().startDate.toDate(),
                endDate: doc.data().endDate ? doc.data().endDate.toDate() : doc.data().endDate,
                multiday: doc.data().multiday,
                location: doc.data().location,
                file: doc.data().file,
                description: doc.data().description
            };
            events.push(eventData);
        });
        return events;
    }
}
exports.DbInstance = DbInstance;
//# sourceMappingURL=DbInstance.js.map