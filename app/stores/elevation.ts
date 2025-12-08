// app/stores/elevation.ts
import { defineStore } from 'pinia';
import * as turf from '@turf/turf';

export const useElevationStore = defineStore('elevation', {
  state: () => ({
    polygon: null as (GeoJSON.Polygon | GeoJSON.MultiPolygon | GeoJSON.Feature<GeoJSON.Polygon | GeoJSON.MultiPolygon>) | null,
    samples: [] as Array<{ lng: number; lat: number; elevation: number }>,
  }),
  actions: {
    setPolygon(polygon: GeoJSON.Polygon | GeoJSON.MultiPolygon | GeoJSON.Feature<GeoJSON.Polygon | GeoJSON.MultiPolygon>) {
      this.polygon = polygon;
    },

    async sampleFromPolygon(map: mapboxgl.Map, gridSpacingMeters = 300) {
      if (!this.polygon) return;
      const polygonFeature =
        this.polygon.type === 'Feature'
          ? this.polygon
          : turf.feature(this.polygon);
      // make a grid of points inside your polygon
      const grid = turf.pointGrid(turf.bbox(polygonFeature), gridSpacingMeters, {
        units: 'meters',
        mask: polygonFeature,
      });
      this.samples = grid.features
        .map(f => {
          if (!f.geometry || f.geometry.type !== 'Point') return null;
          const coords = f.geometry.coordinates;
          if (!Array.isArray(coords) || coords.length < 2) return null;
          const [lngRaw, latRaw] = coords;
          if (!Number.isFinite(lngRaw) || !Number.isFinite(latRaw)) return null;
          const lng = lngRaw as number;
          const lat = latRaw as number;
          const elevation = map.queryTerrainElevation({ lng, lat });
          if (!Number.isFinite(elevation)) return null;
          return { lng, lat, elevation: elevation as number };
        })
        .filter((p): p is { lng: number; lat: number; elevation: number } => !!p);
    },

    toGeoJSON(): GeoJSON.FeatureCollection<GeoJSON.Point> {
      return {
        type: 'FeatureCollection',
        features: this.samples.map(s => ({
          type: 'Feature',
          properties: { elevation: s.elevation },
          geometry: { type: 'Point', coordinates: [s.lng, s.lat] },
        })),
      };
    },
  },
});
