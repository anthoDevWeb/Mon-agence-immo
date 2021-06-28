import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Property} from '../interfaces/property';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {

  properties: Property[] = [];

  propertiesSubject = new Subject<Property[]>();

  constructor() {
  }

  // Emission des propriétés
  emitProperties = () => {
    this.propertiesSubject.next(this.properties);
  }

  saveProperties = () => {
    firebase.database().ref('/properties').set(this.properties);
  }

  getProperties = () => {
    firebase.database().ref('/properties').on('value', (data) => {
      this.properties = data.val() ? data.val() : [] ;
      this.emitProperties();
    });
  }

  // Création d'une propriété
  createProperty = (property: Property) => {
    this.properties.push(property);
    this.saveProperties();
    this.emitProperties();
  }

  // Suppresion d'une propriété
  deleteProperty = (index) => {
    this.properties.splice(index, 1);
    this.saveProperties();
    this.emitProperties();
  }

  // Mise à jour d'une propriété
  updateProperty = (property: Property, index) => {
    // this.properties[index] = property;
    // this.saveProperties();
    // this.emitProperties();
    firebase.database().ref('/properties/' + index).update(property);
  }

  getSingleProperty = (id) => {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/properties/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }
        ).catch(
          (err) => {
            reject(err);
          }
        );
      }
    );
  }

}
