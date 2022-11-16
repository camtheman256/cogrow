import { getAuth } from "firebase-admin/auth";
import { initializeApp, applicationDefault } from "firebase-admin/app";

const app = initializeApp({
  credential: applicationDefault(),
});

async function setAdmin(uid) {
  await getAuth(app)
    .setCustomUserClaims(uid, { admin: true });
  console.log("User set to admin successfully.");
}

async function getUserInfo(uid) {
  return await getAuth(app).getUser(uid)
}
