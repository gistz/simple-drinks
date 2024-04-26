# SimpleDrinks

What better drink than beer?

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.5.

JSON configuration files can be found here [JSONConfigs](https://github.com/gistz/simple-drinks/tree/master/src/assets/json)

Why just have 1 config.json when we can have more one? 

White labeling can be more than adding provisions for thematic changes

This is what got me thinking on how would I approach solving this issue of creating an app that is to be white labeled and solve the drinks list and display

The first approach that I have with white labeling in mind is to have a mental model that sees that the app can be mostly considered as a shell for the Drinks List and Details

With that in mind I structured the app in a way that the drinks feature can be extracted easily in the future esp when used in a monorepo, thin app layer, thick libraried approach as I've mentioned earlier

## Modifying App with JSON

Here is the app config json

```
{
    "appName" : "Name",
    "favIcon": "favicon.ico",
    "brandLogo": "",
    "headerText": "Drinks",
    "headerColor": "deep-orange",
    "footerText": "",
    "theme":"dark", "API_URL_DRINKS":"https://www.thecocktaildb.com/api/json/v1/1"
}
```

this is very thin, mostly just used for theming and some text changes. 

One good thing about it is that it uses APP_INITIALIZER ensuring that this runs before anything else. Can be extended easily in the future

##Notable keys for theming

```
theme: "light|dark"
headerColor: https://github.com/beercss/beercss/blob/main/docs/HELPERS.md#colors
```

Drinks list json


```
{
      "id": "1",
      "layout": "tiles",
      "headerText": "Alcoholic Drinks",
      "queryString": "a=Alcoholic",
      "showControls": false,
      "itemLimit": 0,
      "linkEnabled": true
    }
```

Layout is a selection between "tiles" and "compact"

queryStrings 
this defaults to alcoholic but can be extended with this approach

showControls
Displays the controls for toggling UI

ItemLimit
limits the content displayed by list

linkEnabled
toggleLinks in drinks list defaults true







## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
