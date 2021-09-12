import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor() { }


  makeVehiclePopup(Data: any): string {
    return `` +
      `<div style='color: #039c4b;text-align:center;'><b>${Data.name}</b></div>` +
      `<div style='text-align: center; margin: 5px 0;'><img style='height: 50px;' src=assets/images/${Data.picture.name}.png></div>` +
      `<div><b>Numer boczny:</b> ${Data.sideNumber}</div>` +
      `<div><b>Rejestracja:</b> ${Data.platesNumber}</div>` +
      `<div><br></div>` +
      `<div><b>Poziom baterii:</b> ${Data.batteryLevelPct}%</div>` +
      `<div><b>Zasięg:</b> ${Data.rangeKm}km</div>`
  }

  makePoiPopup(Data: any): string {
    return `` +
      `<div><b>${Data.category == 'Stacje kolejowe' ? Data.description : Data.name}</b></div>` +
      `<div>${Data.name != Data.description && Data.category != 'Stacje kolejowe' ? Data.description : ''}</div>`
  }

  makeParkingPopup(Data: any): string {
    return `` +
      `<div><b>${Data.address.street} ${Data.address.house != null ? Data.address.house : ''}</b></div>` +
      `<div>Liczba miejsc: ${Data.spacesCount}</div>` +
      `<div>Wolene miejsca: ${Data.availableSpacesCount}</div>`
  }
}
