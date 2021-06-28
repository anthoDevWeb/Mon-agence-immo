import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {error} from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor() { }

  uploadFile = (file: File) => {
    return new Promise(
      (resolve , reject) => {
        const uniqueId = Date.now().toString();
        const fileName = uniqueId + file.name;
        const upload = firebase.storage().ref().child('images/properties/' + fileName).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement...');
          },
          (err) => {
            reject(err);
          },
          () => {
            upload.snapshot.ref.getDownloadURL().then(
              (downloadUrl) => {
                resolve(downloadUrl);
              }
            );
          }
        );
      }
    );
  }

  removeFile = (fileLink: string) => {
    if (fileLink){
          const storageRef = firebase.storage().refFromURL(fileLink);
          storageRef.delete().then(
            () => {
              console.log('File deleted');
            }
          ).catch(
            (err) => {
              console.error(err);
            }
          );
    }
  }
}
