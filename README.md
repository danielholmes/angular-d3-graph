# AngularD3

Live project URL:
https://mbborromeo.github.io/angular-d3-graph/

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.1.

I heavily referred to the online tutorial 'Creating a responsive graph with Angular and D3' by Jean-Philippe Lemieux (https://medium.com/@jeanphilippelemieux/creating-a-responsive-graph-with-angular-and-d3-b45bb8065588).

However, I used a CSV file from Public Health Infobase Canada (https://health-infobase.canada.ca/covid-19/) to get COVID-19 number of cases per state data, instead of a local JSON file.

*Note to self:  If you are using a local CSV file, make sure you use a relative path to the CSV file in the ./assets folder, because the path is for after the compilation/build (and not before).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Deploy to GitHub Pages

ng build --prod --base-href /angular-d3-graph/
Then add/commit changes and push to origin master branch.
Then in GitHub, set up 'master docs' for the GitHub Pages.

Resource: 
https://angular.io/guide/deployment#deploy-to-github-pages

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## To Do

- In D3.js graph, show all provinces for latest date, and maybe have drop down to select previous dates
- Or maybe only show one province with a range of dates, but have buttons to switch between provinces
- Could swap graph axis so that y-axis are the running dates from newest to oldest, and x-axis is the number of cases
- Try building a proxy to allow Cross-Origin fetching of resources
- Set up 404 error page and route
- Add a loading graphic while CSV is being fetched (can be slow going through a proxy)