// // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import {} from "firebase/messaging/sw";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyB1_s8vxVBrvY-dx5_e50jSfE4Hnw_xnHU",
  authDomain: "showroom-f3071.firebaseapp.com",
  projectId: "showroom-f3071",
  storageBucket: "showroom-f3071.appspot.com",
  messagingSenderId: "1096232275296",
  appId: "1:1096232275296:web:0371533157695ce6d16205",
  measurementId: "G-24QYE7XJYQ",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);

export const getTokenFb = () => {
  return new Promise((resolve, reject) => {
    getToken(messaging, {
      vapidKey:
        "BJc_DrAxyF_9hmEOOwICZBytQe6i_i5yAEgK-qz6KnwnUEEO03ymySqUWjZC62j4GS4RTk-rVL-otkmQsdUsvOs",
    }).then((data) => {
      return resolve(data);
    });
  });
};

export const onMessageListener = () => {
  return new Promise((resolve, reject) => {
    console.log(messaging);
    onMessage(messaging, (payload) => {
      console.log(payload);
      if (payload) {
        return resolve(payload);
      } else {
        return reject("error");
      }
    });
  });
};

// //AAAAso0IkQY:APA91bERG0kcVVWeWKSl1ck3fROjbD5DxYsYPNkedp_bBkEHE1V_Ah4YANWjbptBKR9X2jwtdGykno4SCK2WUSM_mr1vt0svgmscKjtelQpSdbTI2PYC3J1iLrEn9st6muPxmsFtRFkz
