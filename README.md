<h1 align="center">Welcome to ng-builder-google-maps 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://twitter.com/plexearth" target="_blank">
    <img alt="Twitter: plexearth" src="https://img.shields.io/twitter/follow/plexearth.svg?style=social" />
  </a>
</p>

> Angular CLI builder that adds the Google Maps API into your application

The builder essentially creates a new `index.html` file that loads the Google Maps API. That way you can maintain different versions of your Angular application with Google Maps or not. Especially useful for Electron applications that can operate in two modes, one of them with Google Maps.

### 🏠 [Homepage](https://github.com/Developer-Plexscape/ng-builder-google-maps)

## Install

```sh
npm install ng-builder-google-maps
```

## Usage

To use the builder, first you need to add a new architect entry in the **angular.json** file.

```
"google-maps": {
  "builder": "ng-builder-google-maps:gmaps",
  "options": {}
}
```

The builder accepts the following options:

- `inFile`: The path of the application `index.html` file (e.g. `dist/my-app/index.html`)
- `outFile`: The path of the destination HTML file (e.g `dist/my-app/index-gm.html`)
- `version`: The version of the Google Maps API to use (e.g. 3.37)
- `key`: *(optional)* Your Google Maps API key

You can then run it using the command below:

`ng run [project-name]:google-maps`

## Author

👤 **Plexscape**

* Website: http://www.plexearth.com
* Twitter: [@plexearth](https://twitter.com/plexearth)
* Github: [@Developer-Plexscape](https://github.com/Developer-Plexscape)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/Developer-Plexscape/ng-builder-google-maps/issues). 

## Show your support

Give a ⭐️ if this project helped you!
