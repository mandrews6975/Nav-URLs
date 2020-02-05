# Nav-URLs
Nav-URLs is a Node.js package capable of generating navigation URLs for various map platforms. Currently, supported platforms include Google Maps, Apple Maps, and Bing Maps. Navigation routes can be generated by raw ordering or distance optimization. Generation of optimized navigation route URLs **requires use of the MapQuest Developer API and a unique request key**. You can register and obtain a free MapQuest API key [here.](https://developer.mapquest.com/)

## Installation
`npm install @mandrews6975/nav-urls`

## Functions
There are two functions for generating navigation URLs (raw ordering and optimized):

**`routeNav(locations, options)`**: returns a raw-ordered navigation URL for the specified platform and locations (string)
* **locations**: array of locations/addresses (strings) written in formats standard map platforms understand (route is ordered from `locations[0]` to `locations[n]`)
* **options**: object containing platform (string) and travelmode (string) (ex. `{platform: 'google', travelmode: 'driving'}`)
  * Property | Possible Values
    ---------|----------------
    platform | google, apple, bing
    travelmode | driving, walking, transit, bicycling (bicycling only supported by Google Maps)

**`routeNavOpt(locations, key, options)`**: returns an optimized navigation URL for the specified platform and locations (string)
* **locations**: array of locations/addresses (strings) written in formats standard map platforms understand (`locations[0]` is origin, `locations[n]` is destination, `locations[1..n-1]` are waypoints to be optimized)
* **key**: string that is a MapQuest API request key (register for a free key [here](https://developer.mapquest.com/))
* **options**: object containing platform (string) and travelmode (string) (ex. `{platform: 'google', travelmode: 'driving'}`)
  * Property | Possible Values
    ---------|----------------
    platform | google, bing
    travelmode | driving, walking, transit, bicycling (bicycling only supported by Google Maps)

## Notes
Apple Maps does not support intermediate waypoints; therefore, if an array of more than two locations is supplied to `routeNav(locations, options)`, only the first and final location will be used in the generated route URL.

## Example
```javascript
const nav = require('@mandrews6975/nav-urls');

let locations = ['Denver', 'New York City', 'Des Moines, IA', 'Devil\'s Tower'];
let options = {platform: 'google', travelmode: 'driving'};
let key = 'ABCDEFG12345';
console.log(nav.routeNavOpt(locations, key, options));
```
Prints
> https://www.google.com/maps/dir/?api=1&origin=Denver&destination=Devil%27s%20Tower&travelmode=driving&waypoints=Des%20Moines%2C%20IA%7CNew%20York%20City

to the console.
