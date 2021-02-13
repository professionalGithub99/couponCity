import firebase from 'firebase/app'
import 'firestore/firestore'
db=firebase.firestore()
db.collection("cities").doc("new-city-id").set({a:'bb',b:'cc'});
var myArgs = process.argv.slice(2);
console.log('myArgs: ', myArgs);

