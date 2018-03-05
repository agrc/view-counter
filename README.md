view-counter
============

A serverless function for counting page views on gis.utah.gov (could be used for any website with unique URLs).

### Development
One-time setup:
1. [Install `gcloud` cli](https://cloud.google.com/functions/docs/quickstart)
1. [Install Cloud Functions Local Emulator](https://cloud.google.com/functions/docs/emulator)
1. [Install Cloud Datastore Emulator](https://cloud.google.com/datastore/docs/tools/datastore-emulator)

To run locally:
1. `gcloud beta emulators datastore start --no-legacy` (must be done _before_ starting the functions emulator)
1. `functions-emulator start`
1. `functions-emulator deploy viewcounter --trigger-http` (you only need to do this once)

To deploy:
```
gcloud beta functions deploy viewcounter --trigger-http --memory=128MB
```
[deploy command docs](https://cloud.google.com/sdk/gcloud/reference/beta/functions/deploy)
