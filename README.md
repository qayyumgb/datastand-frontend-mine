# datastand-frontend

## Version

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.5.

## Development server

### How to run the dev server

```shell
ng start
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Angular CLI commands

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build and deploy (lite-server, non-prod)

To build and deploy the server in a local environment run the following commands:

```shell
ng build
# Mock backend
npm run server
# Frontend
npm run lite-server
```

The build artifacts will be stored in the `dist/data-editor` directory.

The frontend is server under http://localhost:8080/.

The configuration for lite server is under `./bs-config.json`.

To watch for changes in local files, run `ng build --watch`.

# Build and deploy (Node, prod)

```shell
npm run build --prod
node server.js
```

# Build and run the Docker image

To run and deploy the Dockerfile image, first disconnect from the dev container.

Then run:

```shell
docker build -t app-demo .
docker run -p 8080:8080 app-demo
```

The image will be served under http://localhost:8080/.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## FAQ

### I see no tests under Test Explorer

Probably one of the test files has a syntax error and broke the build. Run `ng test` manually, find the broken file and fix it. Tests should reapper in the Test Explorer UI.

### I see no data in Workbench

Probably you forgot to run `ng server` before running `ng start`. Running `ng server` and refreshing the browser should fix the issue.
