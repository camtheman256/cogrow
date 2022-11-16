import { getAuth } from "firebase-admin/auth";
import { initializeApp, applicationDefault } from "firebase-admin/app";

const app = initializeApp({
  credential: applicationDefault(),
});

function setAdmin(uid) {
  getAuth(app)
    .setCustomUserClaims(uid, { admin: true })
    .then(() => console.log("User set to admin successfully."));
}

