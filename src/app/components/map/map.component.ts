import { Component, Input, OnInit } from '@angular/core';
import { latLng, MapOptions, tileLayer } from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Input() userLocation: [number, number] = [0, 0];

  mapOptions: MapOptions = {};

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
}