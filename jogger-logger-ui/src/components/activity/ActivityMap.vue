<script lang="ts">
const { VITE_GOOGLE_MAPS_API_KEY } = import.meta.env;
import type { PolylineMap } from '@/stores/activities/types';
import { Loader } from '@googlemaps/js-api-loader';
import type { PropType } from 'vue';
import { GoogleMap, Polyline as GooglePolyline } from 'vue3-google-map';

const loader = new Loader({ apiKey: VITE_GOOGLE_MAPS_API_KEY, libraries: ['maps', 'geometry'] });
const apiPromise = loader.load();

export default {
  setup() {
    const polylineOptions = {
      path: [],
      strokeColor: '#ff0000',
      strokeOpacity: '1',
      strokeWeight: 4,
    };

    return { apiPromise, polylineOptions };
  },
  mounted() {
    this.apiPromise.then((google) => {
      const codedPath = this.$props.map && this.$props.map.summary_polyline;
      const { decodePath } = google.maps.geometry.encoding;
      const path = codedPath ? decodePath(codedPath) : [];

      const bounds = new google.maps.LatLngBounds();
      path.forEach((point) => {
        bounds.extend(point);
      });

      this.polylineOptions.path = path;
      (this.$refs.mapRef as google.maps.Map).map.fitBounds(bounds);
    });
  },
  components: { GoogleMap, GooglePolyline },
  props: { map: Object as PropType<PolylineMap> },
};
</script>

<template>
  <div class="map-wrapper">
    <GoogleMap :api-promise="apiPromise" ref="mapRef" style="width: 100%; height: 100%">
      <GooglePolyline :options="polylineOptions" />
    </GoogleMap>
  </div>
</template>

<style scoped>
.map-wrapper {
  margin: 0 auto;
  flex-grow: 1;
  width: 60%;
  min-width: 300px;
  height: 70%;
}
</style>
