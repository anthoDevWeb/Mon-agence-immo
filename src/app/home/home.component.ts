import {Component, OnDestroy, OnInit} from '@angular/core';
import {PropertiesService} from '../services/properties.service';
import {Subscription} from 'rxjs';
import {Property} from '../interfaces/property';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  properties: Property[] = [];
  propertiesSubscription: Subscription;

  constructor(
    private propertiesService: PropertiesService
  ) { }

  ngOnInit(): void {
    this.propertiesSubscription = this.propertiesService.propertiesSubject.subscribe(
      (data: Property[]) => {
        this.properties = data;
    });
    this.propertiesService.getProperties();
    this.propertiesService.emitProperties();
  }

  getSoldValue = (sold) => {
    if (sold) {
      return 'red';
    }else{
      return 'green';
    }
  }

  // tslint:disable-next-line:typedef
  ngOnDestroy() {
    this.propertiesSubscription.unsubscribe();
  }
}
