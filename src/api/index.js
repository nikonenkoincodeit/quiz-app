import { initializeApp } from "firebase/app";
import { getDatabase, ref, push } from "firebase/database";
import { firebaseConfig, TABLE_NAME } from "../const";

initializeApp(firebaseConfig);
const db = getDatabase();

export function addData(data) {
  return new Promise((res, rej) => {
    const key = push(ref(db, TABLE_NAME), data).key;
    res(key);
  });
}
