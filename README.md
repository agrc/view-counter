# view-counter

A serverless function for counting page views on gis.utah.gov (could be used for any website with unique URLs).

## development

One-time setup:

1. [Install `gcloud` cli](https://cloud.google.com/functions/docs/quickstart)
1. [Install Cloud Functions Local Emulator](https://cloud.google.com/functions/docs/emulator)
1. [Install Cloud Datastore Emulator](https://cloud.google.com/datastore/docs/tools/datastore-emulator)

To run locally:

`npm start` (starts the functions local emulator, and server for test.html)

## deployment

`npm run deploy`

[deploy command docs](https://cloud.google.com/sdk/gcloud/reference/beta/functions/deploy)
