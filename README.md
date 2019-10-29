# asl-autoproject

Performs an end-to-end project application, including:

* Filling out a complete PPL application with dummy data
* Submitting to ASRU
* Inspector recommending the application
* Licensing officer granting the licence

## Usage

### Locally

With a selenium server running on port 4444:

```
./bin/test [options]
```

### In CI

```yaml
pipeline:
  autoproject:
    image: quay.io/ukhomeofficedigital/asl-autoproject:latest
    pull: true
    secrets:
      - keycloak_password
    commands:
      - cd /app
      - ./bin/test --env preprod
```

## Options

* `--env` - environment to run in `local|dev|preprod` - default `local`
* `--title` - the title to use for the project - default randomly generated string
* `--password` - password to use for logging in - default `process.env.KEYCLOAK_PASSWORD`
* `--fast` - restrict the number of words per answer to 1..10 rather than 10..100 - so that it runs a lot faster

## Notes

Answers to free text fields are generated from random strings created from the content of `text.txt` - this currently contains the content from the "Biochemistry" and "Pharmacology" wikipedia articles in order to make it appear _science-y_.

## To Do:

* Add flag to support a minimal, maximal or random application
* Add a flag to set the number of protocols
* Add a flag to stop at a particular point in the application - i.e. leave as submitted or recommended without granting
* Add some comments/feedback to the inspector journey
