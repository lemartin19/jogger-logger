// https://developers.strava.com/docs/reference/#api-models-SportType
export type SportType =
  | 'AlpineSki'
  | 'BackcountrySki'
  | 'Badminton'
  | 'Canoeing'
  | 'Crossfit'
  | 'EBikeRide'
  | 'Elliptical'
  | 'EMountainBikeRide'
  | 'Golf'
  | 'GravelRide'
  | 'Handcycle'
  | 'HighIntensityIntervalTraining'
  | 'Hike'
  | 'IceSkate'
  | 'InlineSkate'
  | 'Kayaking'
  | 'Kitesurf'
  | 'MountainBikeRide'
  | 'NordicSki'
  | 'Pickleball'
  | 'Pilates'
  | 'Racquetball'
  | 'Ride'
  | 'RockClimbing'
  | 'RollerSki'
  | 'Rowing'
  | 'Run'
  | 'Sail'
  | 'Skateboard'
  | 'Snowboard'
  | 'Snowshoe'
  | 'Soccer'
  | 'Squash'
  | 'StairStepper'
  | 'StandUpPaddling'
  | 'Surfing'
  | 'Swim'
  | 'TableTennis'
  | 'Tennis'
  | 'TrailRun'
  | 'Velomobile'
  | 'VirtualRide'
  | 'VirtualRow'
  | 'VirtualRun'
  | 'Walk'
  | 'WeightTraining'
  | 'Wheelchair'
  | 'Windsurf'
  | 'Workout'
  | 'Yoga';

//https://developers.strava.com/docs/reference/#api-models-MetaAthlete
export interface MetaAthlete {
  id: number;
}

// https://developers.strava.com/docs/reference/#api-models-LatLng
export type LatLng = [number, number];

// https://developers.strava.com/docs/reference/#api-models-PolylineMap
export interface PolylineMap {
  id: string;
  polyline: string;
  summary_polyline: string;
}

// https://developers.strava.com/docs/reference/#api-models-SummaryActivity
export interface Activity {
  athlete: MetaAthlete;
  name: string;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  total_elevation_gain: number;
  sport_type: SportType;
  workout_type: number | null;
  id: number;
  external_id: string;
  upload_id: number;
  start_date: Date;
  start_date_local: Date;
  timezone: string;
  start_latlng: LatLng;
  end_latlng: LatLng;
  location_city: null;
  location_state: null;
  location_country: string;
  achievement_count: number;
  kudos_count: number;
  comment_count: number;
  athlete_count: number;
  photo_count: number;
  map: PolylineMap;
  trainer: boolean;
  commute: boolean;
  manual: boolean;
  private: boolean;
  flagged: boolean;
  gear_id: string;
  from_accepted_tag: false;
  average_speed: number;
  max_speed: number;
  average_cadence: number;
  average_watts: number;
  weighted_average_watts: number;
  kilojoules: number;
  device_watts: boolean;
  has_heartrate: boolean;
  average_heartrate: number;
  max_heartrate: number;
  max_watts: number;
  pr_count: number;
  total_photo_count: number;
  has_kudoed: boolean;
  suffer_score: number;
}
