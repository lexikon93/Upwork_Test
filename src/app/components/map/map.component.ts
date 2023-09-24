import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { MapOptions, tileLayer, Map, latLng, divIcon, marker } from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {
  @Input() userLocation: [number, number] = [0, 0];
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
      center: latLng(this.userLocation)
    };
  }

  ngAfterViewInit(): void {
    const customIcon = divIcon({
      className: 'custom-icon',
      html: `<img src="${this.userProfileImage}" width="32" height="32">`
    });

    const userMarker = marker(this.userLocation, { icon: customIcon });

    if (this.map) {
      userMarker.addTo(this.map);
    }
  }

  onMapReady(map: Map): void {
    this.map = map;
  }
}