import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { MapOptions, tileLayer, Map, latLng, divIcon, marker } from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {
  @Input() userLatitude: number = 0;
  @Input() userLongitude: number = 0;
  @Input() userProfileImage: string = '';

  mapOptions: MapOptions = {};
  map: Map | undefined;

  layersControl = {
    baseLayers: {
      OpenStreetMap: tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '...',
      }),
    },
  };

  constructor() {}

  ngOnInit(): void {
    this.mapOptions = {
      layers: [this.layersControl.baseLayers.OpenStreetMap],
      zoom: 12,
      center: latLng(this.userLatitude, this.userLongitude)
    };
  }

  ngAfterViewInit(): void {
    const customIcon = divIcon({
      className: 'custom-icon',
      html: `<img src="${this.userProfileImage}" width="32" height="32">`
    });

    const userMarker = marker(latLng(this.userLatitude, this.userLongitude), { icon: customIcon });

    if (this.map) {
      userMarker.addTo(this.map);
    }
  }

  onMapReady(map: Map): void {
    this.map = map;
  }
}