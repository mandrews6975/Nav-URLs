exports.routeNav = (locations, options) => {
  let url = '';
  if(locations.length < 2){
    console.log('Invalid locations array: ' + locations.toString());
  }
  if(options.platform = 'google'){
    url += 'https://www.google.com/maps/dir/?api=1';
    url += '&origin=' + escape(locations[0]);
    url += '&destination=' + escape(locations[locations.length - 1]);
    if(options.travelmode != null){
      if(options.travelmode != 'driving' || options.travelmode != 'walking' || options.travelmode != 'bicycling' || options.travelmode != 'transit'){
        console.log('Invalid travelmode for Google Maps: ' + options.travelmode);
        return;
      }
      url += '&travelmode=' + options.travelmode;
    }else{
      url += '&travelmode=driving';
    }
    if(locations.length > 2){
      url += '&waypoints=';
      for(let i = 1; i < locations.length - 2){
        url += escape(locations[i]);
        if(i < locations.length - 2){
          url += '%7C';
        }
      }
    }
    return url;
  }else if(options.platform = 'apple'){
    url += 'http://maps.apple.com/?';
    url += 'saddr=' + escape(locations[0]);
    url += 'daddr=' + escape(locations[locations.length - 1]);
    if(options.travelmode != null){
      if(options.travelmode == 'driving'){
        url += '&dirflg=d';
      }else if(options.travelmode == 'walking'){
        url += '&dirflg=w';
      }else if(options.travelmode == 'transit'){
        url += '&dirflg=r';
      }else{
        console.log('Invalid travelmode for Apple Maps: ' + options.travelmode);
        return;
      }
    }else{
      url += '&dirflg=d';
    }
    if(locations.length > 2){
      console.log('Intermediate waypoints not supported by Apple Maps. Returned URL contains first and final locations only.')
    }
    return url;
  }else if(options.platform = 'bing'){
    url += 'https://bing.com/maps/default.aspx?';
    url += 'rtp=';
    for(let i = 0; i < locations.length; i++){
      url += 'addr.' + escape(locations[i]);
      if(i < locations.length - 1){
        url += '~';
      }
    }
    if(options.travelmode != null){
      if(options.travelmode == 'driving'){
        url += '&mode=D';
      }else if(options.travelmode == 'walking'){
        url += '&mode=W';
      }else if(options.travelmode == 'transit'){
        url += '&mode=T';
      }else{
        console.log('Invalid travelmode for Bing Maps: ' + options.travelmode);
        return;
      }
    }else{
      url += '&mode=D';
    }
    return url;
  }else{
    console.log('Invalid platform specification: ' + options.plaform);
    return;
  }
}

exports.routeNavOpt = (locations, key, options) => {

}
