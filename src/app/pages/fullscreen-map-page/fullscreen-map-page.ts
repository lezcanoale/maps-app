import { DecimalPipe, JsonPipe } from '@angular/common';
import { AfterViewInit, Component, effect, ElementRef, signal, viewChild } from '@angular/core';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

@Component({
  selector: 'app-fullscreen-map-page',
  imports: [DecimalPipe, JsonPipe],
  templateUrl: './fullscreen-map-page.html',
  styles: `
    div {
      width: 100vw;
      height: calc(100vh - 64px);
    }

    #controls {
      background-color: white;
      padding: 10px;
      border-radius: 5px;
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 9999;
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
      border: 1px solid #e2e8f0;
      width: 250px;
    }
  `,
})
export default class FullscreenMapPageComponent implements AfterViewInit {
  divElement = viewChild<ElementRef>('map');

  map = signal<maplibregl.Map | null>(null);

  zoom = signal(1);

  coordinates = signal({
    lng: -74.5,
    lat: 40,
  });

  lat = this.coordinates().lat;
  lng = this.coordinates().lng;

  zoomEffect = effect((onCleanUp) => {
    if (!this.map()) return;
    // this.map()?.zoomTo(this.zoom());
    this.map()?.setZoom(this.zoom());
  });

  async ngAfterViewInit() {
    if (!this.divElement()) return;

    await new Promise((resolve) => setTimeout(resolve, 80));

    const element = this.divElement()!.nativeElement;

    console.log(element);

    const map = new maplibregl.Map({
      container: element, // container id
      style: 'https://demotiles.maplibre.org/globe.json', // style URL
      center: [this.lng, this.lat], // starting position [lng, lat]
      zoom: this.zoom(), // starting zoom
    });

    this.mapListeners(map);
  }

  mapListeners(map: maplibregl.Map) {
    map.on('zoomend', (event) => {
      const newZoom = event.target.getZoom();
      this.zoom.set(newZoom);
    });
    this.map.set(map);

    map.on('moveend', () => {
      const center = map.getCenter();
      console.log(center);
      this.coordinates.set(center);
    });

    map.on('load', () => {
      console.log('map loaded');
    });

    map.addControl(new maplibregl.FullscreenControl());
    map.addControl(new maplibregl.NavigationControl());
    map.addControl(new maplibregl.ScaleControl());
  }
}
