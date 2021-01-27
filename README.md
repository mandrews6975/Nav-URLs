[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/mandrews6975/nav-urls">
    <img src="./assets/icon.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Nav-URLs</h3>

  <p align="center">
    Generate navigation URLs for various map platforms such as Google Maps.
    <br />
    <br />
    <a href="https://github.com/mandrews6975/nav-urls/issues">Report Bug</a>
    ·
    <a href="https://github.com/mandrews6975/nav-urls/issues">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#function-reference">Function Reference</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
    <li><a href="#open-source-licenses">Open Source Licenses</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

Nav-URLs generates navigation URLs for various map platforms. Currently, supported platforms include Google Maps, Apple Maps, and Bing Maps. Navigation routes can be generated by raw ordering or distance optimization. Generation of optimized navigation route URLs **requires a MapQuest Developer API key**. You can register and obtain a free MapQuest API key **[here.](https://developer.mapquest.com/)**

### Built With

- [node-fetch - ^2.6.1](https://www.npmjs.com/package/node-fetch)
- [xmlhttprequest - ^1.8.0](https://www.npmjs.com/package/xmlhttprequest)

<!-- Installation -->

## Installation

Install via NPM:

```sh
npm install @mandrews6975/nav-urls
```

<!-- FUNCTION REFERENCE -->

## Function Reference

There are two preferred functions for generating navigation URLs (raw-ordered and optimized) and two deprecated functions that provide essentially the same functionality.

### **`getRouteURL(locations, options)`**

Returns a raw-ordered navigation URL for the specified platform and locations.

- **Parameters**
  - **locations**
    - Type: `string[]`
    - Description: locations/addresses written in formats standard map platforms understand (route is ordered from `locations[0]` to `locations[n]`)
  - **options**
    - Type: `{platform: 'google' | 'apple' | 'bing', travelmode: 'driving' | 'walking' | 'transit' | 'bicycling'}`
      - Note: `travelmode: 'bicycling'` only supported by Google Maps
    - Description: object containing platform and travelmode
- **Returns**:
  - Type: `string`
  - Description: raw-ordered navigation URL for the specified platform and locations

### **`getOptimizedRouteURL(locations, key, options, callback)`**

Retrieves an optimized navigation URL for the specified platform and locations and passes said URL into its callback function.

- **Parameters**
  - **locations**
    - Type: `string[]`
    - Description: array of locations/addresses written in formats standard map platforms understand (`locations[0]` is origin, `locations[n]` is destination, `locations[1..n-1]` are waypoints to be optimized)
  - **key**: string that is a MapQuest API key (register for a free key **[here](https://developer.mapquest.com/)**)
  - **options**
    - Type: `{platform: 'google' | 'bing', travelmode: 'driving' | 'walking' | 'transit' | 'bicycling'}`
      - Note: `travelmode: 'bicycling'` only supported by Google Maps
    - Description: object containing platform and travelmode
  - **callback**
    - Type: `(navURL: string) => any`
    - Description: function that will be called after the URL is retrieved (takes the optimized navigation URL as a parameter)

### **[DEPRECATED]** **`routeNav(locations, options)`**

Returns a raw-ordered navigation URL for the specified platform and locations.

- **Parameters**
  - **locations**
    - Type: `string[]`
    - Description: locations/addresses written in formats standard map platforms understand (route is ordered from `locations[0]` to `locations[n]`)
  - **options**
    - Type: `{platform: 'google' | 'apple' | 'bing', travelmode: 'driving' | 'walking' | 'transit' | 'bicycling'}`
      - Note: `travelmode: 'bicycling'` only supported by Google Maps
    - Description: object containing platform and travelmode
- **Returns**:
  - Type: `string`
  - Description: raw-ordered navigation URL for the specified platform and locations

### **[DEPRECATED]** **`routeNavOpt(locations, key, options)`**

Returns an optimized navigation URL (string) for the specified platform and locations.

- **Parameters**
  - **locations**
    - Type: `string[]`
    - Description: array of locations/addresses written in formats standard map platforms understand (`locations[0]` is origin, `locations[n]` is destination, `locations[1..n-1]` are waypoints to be optimized)
  - **key**: string that is a MapQuest API key (register for a free key **[here](https://developer.mapquest.com/)**)
  - **options**
    - Type: `{platform: 'google' | 'bing', travelmode: 'driving' | 'walking' | 'transit' | 'bicycling'}`
      - Note: `travelmode: 'bicycling'` only supported by Google Maps
    - Description: object containing platform and travelmode
- **Returns**:
  - Type: `string`
  - Description: optimized navigation URL for the specified platform and locations

<!-- USAGE EXAMPLES -->

## Usage

### **Example 1**

Print raw-ordered Google Maps navigation URL to console:

```javascript
const nav = require('@mandrews6975/nav-urls');

let locations = [
	'Denver',
	'New York City',
	'Des Moines, IA',
	"Devil's Tower",
	'Duck Key',
];
let options = {
	platform: 'google',
	travelmode: 'driving',
};

console.log(nav.getRouteURL(locations, options));
```

Result:

> https://www.google.com/maps/dir/?api=1&origin=Denver&destination=Duck%20Key&travelmode=driving&waypoints=New%20York%20City%7CDes%20Moines%2C%20IA%7CDevil%27s%20Tower

### **Example 2**

Print optimized Google Maps navigation URL to console:

```javascript
let locations = [
	'Denver',
	'New York City',
	'Des Moines, IA',
	"Devil's Tower",
	'Duck Key',
];
let options = {
	platform: 'google',
	travelmode: 'driving',
};
let key = 'mapquest_api_key';

nav.getOptimizedRouteURL(locations, key, options, (navURL) =>
	console.log(navURL)
);
```

Result:

> https://www.google.com/maps/dir/?api=1&origin=Denver&destination=Duck%20Key&travelmode=driving&waypoints=Devil%27s%20Tower%7CDes%20Moines%2C%20IA%7CNew%20York%20City

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

Michael Andrews - GitHub: [mandrews6975](https://github.com/mandrews6975) - Email: [me@michaelandrews.dev](mailto:me@michaelandrews.dev)

Project Link: [https://github.com/mandrews6975/Nav-URLs](https://github.com/mandrews6975/Nav-URLs)

<!-- ACKNOWLEDGEMENTS -->

## Acknowledgements

- [Best-README-Template](https://github.com/othneildrew/Best-README-Template)

<!-- OPEN SOURCE LICENSES -->

## Open Source Licenses

- [node-fetch](https://github.com/node-fetch/node-fetch/blob/master/LICENSE.md)
- [xmlhttprequest](https://github.com/driverdan/node-XMLHttpRequest/blob/master/LICENSE)
- [Best-README-Template](https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/mandrews6975/Nav-URLs.svg?style=for-the-badge
[contributors-url]: https://github.com/mandrews6975/Nav-URLs/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/mandrews6975/Nav-URLs.svg?style=for-the-badge
[forks-url]: https://github.com/mandrews6975/Nav-URLs/network/members
[stars-shield]: https://img.shields.io/github/stars/mandrews6975/Nav-URLs.svg?style=for-the-badge
[stars-url]: https://github.com/mandrews6975/Nav-URLs/stargazers
[issues-shield]: https://img.shields.io/github/issues/mandrews6975/Nav-URLs.svg?style=for-the-badge
[issues-url]: https://github.com/mandrews6975/Nav-URLs/issues
[license-shield]: https://img.shields.io/github/license/mandrews6975/Nav-URLs.svg?style=for-the-badge
[license-url]: https://github.com/mandrews6975/Nav-URLs/blob/master/LICENSE
