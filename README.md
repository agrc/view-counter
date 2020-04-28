# view-counter

A serverless function for counting page views on gis.utah.gov (could be used for any website with unique URLs).

## development

One-time setup:

1. [Install `gcloud` cli](https://cloud.google.com/functions/docs/quickstart)
1. [Install Cloud Functions Local Emulator](https://cloud.google.com/functions/docs/emulator)
1. [Install Cloud Datastore Emulator](https://cloud.google.com/datastore/docs/tools/datastore-emulator)

To run locally:

1. `gcloud beta emulators datastore start --no-legacy`
1. `(gcloud beta emulators datastore env-init)`
   - Sets the environment variables (must be done _before_ starting the functions emulator)

1. `functions-emulator start`
1. `functions-emulator deploy viewcounter --trigger-http` (you only need to do this once)

## deployment

```sh
gcloud functions deploy viewcounter --trigger-http --memory=128MB --runtime=nodejs10 --allow-unauthenticated
```

[deploy command docs](https://cloud.google.com/sdk/gcloud/reference/beta/functions/deploy)
