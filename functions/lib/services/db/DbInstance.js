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
}
exports.DbInstance = DbInstance;
//# sourceMappingURL=DbInstance.js.map