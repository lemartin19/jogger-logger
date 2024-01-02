# jogger-logger

https://jogger-logger.ue.r.appspot.com/

## Developing

First install all dependencies by running

```sh
npm run install
```

From the project root. Then in two separate terminal tabs, run

```sh
npm run server
npm run ui
```

You can then view and test the app at http://localhost:5173/

Must ensure that the Strava API client secret (https://www.strava.com/settings/api) is set for local development.

## Build and deploy

The app is deployed via [Google Cloud Run](https://cloud.google.com/run?hl=en) at https://jogger-logger.ue.r.appspot.com/.

The deploy config can be found at `jogger-logger/app.yaml`. The frontend is built and statically deployed alongside the Node JS service.

To build and deploy the app, run:

```sh
npm run build
gcloud app deploy
npm run clean
```

## TODO

- [ ] TypeScript compile to a specific directory to avoid committing the compiled assets
- [ ] Setup a database
- [ ] Implement "Plans"
  - [ ] View activities
  - [ ] Create new activities
  - [ ] Relate planned activities to Strava activities
- [ ] Stats
  - [ ] How close to the plan was reality
  - [ ] Mark key workouts
  - [ ] Weekly mileage histograms
