import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PropertiesService} from '../../services/properties.service';
import {Subscription} from 'rxjs';
import * as $ from 'jquery';
import { Property } from '../../interfaces/property';
import {ImagesService} from '../../services/images.service';

@Component({
  selector: 'app-admin-properties',
  templateUrl: './admin-properties.component.html',
  styleUrls: ['./admin-properties.component.css']
})
export class AdminPropertiesComponent implements OnInit {

  propertiesForm: FormGroup;

  propertiesSubscription: Subscription;
  properties: Property[] = [];

  indexToRemove;

  indexToUpdate;
  editmode = false;

  photoUploading = false;
  photoUploaded = false;
  photoAdded: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private propertiesService: PropertiesService,
    private imagesService: ImagesService
  ) { }

  ngOnInit(): void {
    this.initPropertiesForm();
    this.propertiesService.propertiesSubject.subscribe(
      (data: Property[]) => {
        this.properties = data;
      }
    );
    this.propertiesService.getProperties();
    this.propertiesService.emitProperties();
  }

  // Initialisation du formulaire
  initPropertiesForm = () => {
    this.propertiesForm = this.formBuilder.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      surface: ['', Validators.required],
      rooms: ['', Validators.required],
      description: '',
      price: ['', Validators.required],
      sold: ''
    });
  }

  // Mise à jour et création d'une propriété
  onSubmitPropertiesForm = () => {
    const newProperty: Property = this.propertiesForm.value;
    newProperty.sold = this.propertiesForm.get('sold').value ? this.propertiesForm.get('sold').value : false ;
    newProperty.photos = this.photoAdded ? this.photoAdded : [];
    if (this.editmode){
      this.propertiesService.updateProperty(newProperty, this.indexToUpdate);
    }else {
      this.propertiesService.createProperty(newProperty);
    }
    $('#propertiesFormModal').modal('hide');
  }

  // Mise à  zéro du formulaire après la validation
  resetForm(): void {
    this.editmode = false;
    this.propertiesForm.reset();
    this.photoAdded = [];
  }

  // Affichage de la modal pour la suppression d'une propriété
  onDeleteProperty = (id) => {
    $('#deletePropertyModal').modal('show');
    this.indexToRemove = id;
  }

  // Modal de confirmation pour la suppression d'une propriété
  onConfirmDeleteProperty = () => {
    this.properties[this.indexToRemove].photos.forEach(
      (photo) => {
        this.imagesService.removeFile(photo);
      }
    );
    this.propertiesService.deleteProperty(this.indexToRemove);
    $('#deletePropertyModal').modal('hide');
  }

  // Edition d'une propriété via le formulaire en modal
  onEditProperty = (property: Property) => {
    this.editmode = true;
    $('#propertiesFormModal').modal('show');
    this.propertiesForm.get('title').setValue(property.title);
    this.propertiesForm.get('category').setValue(property.category);
    this.propertiesForm.get('surface').setValue(property.surface);
    this.propertiesForm.get('rooms').setValue(property.rooms);
    this.propertiesForm.get('description').setValue(property.description ? property.description : '');
    this.propertiesForm.get('price').setValue(property.price);
    this.propertiesForm.get('sold').setValue(property.sold);
    this.photoAdded = property.photos ? property.photos : [];
    const index = this.properties.findIndex((propertyEl) => {
      if (propertyEl === property) {
        return true;
        }
      });
    this.indexToUpdate = index;
  }

  onUploadFile = (event) => {
    this.photoUploading = true;
    this.imagesService.uploadFile(event.target.files[0]).then(
      (url: string) => {
        this.photoAdded.push(url);
        this.photoUploading = false;
        this.photoUploaded = true;
        setTimeout(() => {
          this.photoUploaded = false;
        }, 5000);
      }
    );
  }
  onRemoveAddedPhoto = (id) => {
    this.imagesService.removeFile(this.photoAdded[id]);
    this.photoAdded.splice(id, 1);
  }

}
