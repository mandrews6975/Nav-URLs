const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

exports.routeNav = (locations, options) => {
  let url = '';
  if (locations.length < 2) {
    console.log('Invalid locations array: ' + locations.toString());
    return;
  }
  if (options.platform == 'google') {
    url += 'https://www.google.com/maps/dir/?api=1';
    url += '&origin=' + escape(locations[0]);
    url += '&destination=' + escape(locations[locations.length - 1]);
    if (options.travelmode != null) {
      if (options.travelmode == 'driving' || options.travelmode == 'walking' || options.travelmode == 'transit' || options.travelmode == 'bicycling') {
        url += '&travelmode=' + options.travelmode;
      } else {
        console.log('Invalid travelmode for Google Maps: ' + options.travelmode);
        return;
      }
    } else {
      url += '&travelmode=driving';
    }
    if (locations.length > 2) {
      url += '&waypoints=';
      for (let i = 1; i < locations.length - 1; i++) {
        url += escape(locations[i]);
        if (i < locations.length - 2) {
          url += '%7C';
        }
      }
    }
    return url;
  } else if (options.platform == 'apple') {
    url += 'http://maps.apple.com/?';
    url += 'saddr=' + locations[0].replace(',', '').replace(' ', '+');
    url += '&daddr=' + locations[locations.length - 1].replace(',', '').replace(' ', '+');
    if (options.travelmode != null) {
      if (options.travelmode == 'driving') {
        url += '&dirflg=d';
      } else if (options.travelmode == 'walking') {
        url += '&dirflg=w';
      } else if (options.travelmode == 'transit') {
        url += '&dirflg=r';
      } else {
        console.log('Invalid travelmode for Apple Maps: ' + options.travelmode);
        return;
      }
    } else {
      url += '&dirflg=d';
    }
    if (locations.length > 2) {
      console.log('Intermediate waypoints not supported by Apple Maps. Returned URL contains first and final locations only.')
    }
    return url;
  } else if (options.platform == 'bing') {
    url += 'https://bing.com/maps/default.aspx?';
    url += 'rtp=';
    for (let i = 0; i < locations.length; i++) {
      url += 'adr.' + locations[i].replace(' ', '%20');
      if (i < locations.length - 1) {
        url += '~';
      }
    }
    if (options.travelmode != null) {
      if (options.travelmode == 'driving') {
        url += '&mode=D';
      } else if (options.travelmode == 'walking') {
        url += '&mode=W';
      } else if (options.travelmode == 'transit') {
        url += '&mode=T';
      } else {
        console.log('Invalid travelmode for Bing Maps: ' + options.travelmode);
        return;
      }
    } else {
      url += '&mode=D';
    }
    return url;
  } else {
    console.log('Invalid platform specification: ' + options.platform);
    return;
  }
}

exports.routeNavOpt = (locations, key, options) => {
  let http = new XMLHttpRequest();
  let urlGET = 'http://www.mapquestapi.com/directions/v2/optimizedroute?key=' + key;
  let payload = {
    locations: locations
  };
  payload = JSON.stringify(payload);
  urlGET += '&json=' + payload;
  try {
    http.open('GET', urlGET, false);
    http.send();
    res = JSON.parse(http.responseText);
    let optLocOrder = res.route.locationSequence;
    let optLocations = [];
    for (let i = 0; i < locations.length; i++) {
      optLocations.push(locations[optLocOrder[i]]);
    }
    if (options.platform == 'apple') {
      console.log('Invalid platform specification: ' + options.platform);
      return;
    }
    return exports.routeNav(optLocations, options);
  } catch (error) {
    console.log(error);
    return;
  }
}