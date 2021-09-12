import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from '../marker.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {


  private map!: L.Map;
  private mapCenter: L.LatLngExpression = [52.23235, 21.00412];

  private initMap(): void {

    const tile = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 8,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    const availableCarsLayer = this.markerService.makeVehicleMarkers()[0];
    const carsLayer = this.markerService.makeVehicleMarkers()[1];
    const parkingLayer = this.markerService.makeParkingMarkers();
    const trainLayer = this.markerService.makePoiMarkers()[0];
    const poiLayer = this.markerService.makePoiMarkers()[1];

    this.map = L.map('map', {
      center: this.mapCenter,
      zoom: 12,
      layers: [tile, availableCarsLayer, carsLayer, parkingLayer, trainLayer, poiLayer]
    });

    const baseMap = {
    }

    const overlayMap = {
      "<img style='height: 15px; width: 20px; margin:5px' src='assets/map-markers/car-available-solid.png'>": availableCarsLayer,
      "<img style='height: 15px; width: 20px; margin:5px' src='assets/map-markers/car-solid.png'>": carsLayer,
      "<img style='height: 15px; width: 15px; margin:5px' src='assets/map-markers/parking-solid.png'>": parkingLayer,
      "<img style='height: 15px; width: 15px; margin:5px' src='assets/map-markers/train-solid.png'>": trainLayer,
      "<img style='height: 15px; width: 15px; margin:5px' src='assets/map-markers/poi-solid.png'>": poiLayer,
    }

    L.control.layers(baseMap, overlayMap, { collapsed: false }).addTo(this.map);

  }

  constructor(private markerService: MarkerService) { }

  ngAfterViewInit(): void {
    this.initMap();

  }

}
