import { Component, OnInit } from '@angular/core';
import {Property} from '../interfaces/property';
import {PropertiesService} from '../services/properties.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {

  property: Property;

  constructor(
    private propertiesService: PropertiesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.propertiesService.getSingleProperty(id).then(
      (property: Property) => {
        this.property = property;
      }
    ).catch(
      (err) => {
        console.error(err);
      }
    );
  }

}
