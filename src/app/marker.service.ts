import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { PopupService } from './popup.service';
import 'leaflet.markercluster';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  mapDataUrl: string = 'https://dev.vozilla.pl/api-client-portal/map';
  headers = new HttpHeaders().set('Access-Control-Request-Headers', 'x-ctx-organization-id: 38c6047f-d9fd-496b-b4d6-27785499c6d7');

  vehicleParam = new HttpParams().set('objectType', 'VEHICLE');
  poiParam = new HttpParams().set('objectType', 'POI');
  parkingParam = new HttpParams().set('objectType', 'PARKING');
  markerClusterGroupOptions = {
    spiderfyOnMaxZoom: false,
    disableClusteringAtZoom: 16,
    showCoverageOnHover: false,
  };


  constructor(
    private http: HttpClient,
    private popupService: PopupService
  ) { }

  makeVehicleMarkers(): any {

    const carMarkersGroup = L.markerClusterGroup(this.markerClusterGroupOptions);

    this.http.get(this.mapDataUrl, { headers: this.headers, params: this.vehicleParam }).subscribe((res: any) => {
      for (const c of res.objects) {
        const lon = c.location.longitude;
        const lat = c.location.latitude;
        const carMarkers = L.icon({
          iconUrl: `assets/map-markers/${c.status == 'AVAILABLE' ? 'car-available' : 'car'}-solid.png`,
          iconSize: [25, 20],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          tooltipAnchor: [16, -28]
        });
        const marker = L.marker([lat, lon], { icon: carMarkers });
        carMarkersGroup.addLayer(marker);
        marker.bindPopup(this.popupService.makeVehiclePopup(c));
      }
    });
    return carMarkersGroup;
  };

  makePoiMarkers(): any {

    const trainMarkersGroup = L.markerClusterGroup(this.markerClusterGroupOptions);
    const poiMarkersGroup = L.markerClusterGroup(this.markerClusterGroupOptions);


    this.http.get(this.mapDataUrl, { headers: this.headers, params: this.poiParam }).subscribe((res: any) => {
      for (const c of res.objects) {
        const lon = c.location.longitude;
        const lat = c.location.latitude;
        const trainAndPoiMarkers = L.icon({
          iconUrl: `assets/map-markers/${c.category == 'Stacje kolejowe' ? 'train' : 'poi'}-solid.png`,
          iconSize: [25, 25],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          tooltipAnchor: [16, -28]
        });
        const marker = L.marker([lat, lon], { icon: trainAndPoiMarkers });

        marker.bindPopup(this.popupService.makePoiPopup(c));

        if (c.category == 'Stacje kolejowe') {
          trainMarkersGroup.addLayer(marker);
        } else {
          poiMarkersGroup.addLayer(marker);
        }
      }
    });
    const poiGroup = [trainMarkersGroup, poiMarkersGroup];

    return poiGroup;
  }

  makeParkingMarkers(): any {

    const parkingMarkersGroup = L.markerClusterGroup(this.markerClusterGroupOptions);

    this.http.get(this.mapDataUrl, { headers: this.headers, params: this.parkingParam }).subscribe((res: any) => {
      for (const c of res.objects) {
        const lon = c.location.longitude;
        const lat = c.location.latitude;
        const parkingMarker = L.icon({
          iconUrl: 'assets/map-markers/parking-solid.png',
          iconSize: [25, 25],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          tooltipAnchor: [16, -28]
        });
        const marker = L.marker([lat, lon], { icon: parkingMarker });

        parkingMarkersGroup.addLayer(marker);

        marker.bindPopup(this.popupService.makeParkingPopup(c));
      }
    });
    return parkingMarkersGroup;
  }

}
