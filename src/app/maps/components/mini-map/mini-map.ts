import { AfterViewInit, Component, ElementRef, input, signal, viewChild } from '@angular/core';
import { HouseProperty } from '../../../pages/houses-page/houses-page';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

@Component({
  selector: 'app-mini-map',
  imports: [],
  templateUrl: './mini-map.html',
  styles: `
    div {
      width: 100%;
      height: 260px;
    }
  `,
})
export class MiniMap implements AfterViewInit {
  house = input.required<HouseProperty>();
  zoom = input<number>(5);
  divElement = viewChild<ElementRef>('map');

  map = signal<maplibregl.Map | null>(null);

  async ngAfterViewInit() {
    if (!this.divElement()) return;

    const lngLat = this.house().lngLat;

    await new Promise((resolve) => setTimeout(resolve, 80));

    const element = this.divElement()!.nativeElement;

    const map = new maplibregl.Map({
      container: element, // container id
      style: 'https://demotiles.maplibre.org/globe.json', // style URL
      center: lngLat, // starting position [lng, lat]
      zoom: this.zoom(), // starting zoom
      interactive: false,
    });

    new maplibregl.Marker().setLngLat(lngLat).addTo(map);
  }
}
