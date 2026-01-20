import { AfterViewInit, Component, ElementRef, signal, viewChild } from '@angular/core';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { v4 as UUIDV4 } from 'uuid';

interface Marker {
  id: string;
  maplibreMarker: maplibregl.Marker;
}

@Component({
  selector: 'app-markers-page',
  imports: [],
  templateUrl: './markers-page.html',
})
export default class MarkersPageComponent implements AfterViewInit {
  divElement = viewChild<ElementRef>('map');
  map = signal<maplibregl.Map | null>(null);
  markers = signal<Marker[]>([]);

  async ngAfterViewInit() {
    if (!this.divElement()) return;

    await new Promise((resolve) => setTimeout(resolve, 80));

    const element = this.divElement()!.nativeElement;

    console.log(element);

    const map = new maplibregl.Map({
      container: element, // container id
      style: 'https://demotiles.maplibre.org/globe.json', // style URL
      center: [-57.64405062212704, -25.31422890831556], // starting position [lng, lat]
      zoom: 5, // starting zoom
    });

    // const marker = new maplibregl.Marker({
    //   draggable: false,
    //   color: 'red',
    // })
    //   .setLngLat([-57.64405062212704, -25.31422890831556])
    //   .addTo(map);

    // marker.on('draggend', (event) => {
    //   console.log(event);
    // });

    this.mapListeners(map);
  }

  mapListeners(map: maplibregl.Map) {
    map.on('click', (event) => this.mapClick(event, map));

    this.map.set(map);
  }

  mapClick(event: maplibregl.MapMouseEvent, map: maplibregl.Map) {
    console.log(event.lngLat);
    const { lng, lat } = event.lngLat;
    const color = '#xxxxxx'.replace(/x/g, (y) => ((Math.random() * 16) | 0).toString(16));
    const marker = new maplibregl.Marker({
      draggable: false,
      color: color,
    })
      .setLngLat([lng, lat])
      .addTo(map);
    const newMarker: Marker = {
      id: UUIDV4(),
      maplibreMarker: marker,
    };
    this.markers.update((markers) => [newMarker, ...markers]);
  }
}
