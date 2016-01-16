
define(['../libs/knockout/knockout.min','./DomHandler'],function(ko,dh){function AppViewModel(){let self=this;self.domHandler=new dh();self.searchTerms=ko.observable('');self.locations=[{name:'Champetieres',description:'Sympathique bourgade où il fait bon vivre',lat:45.518391,lng:3.694525,visible:ko.observable(true)},{name:'Osny',description:'This is home',lat:49.069760,lng:2.063321,visible:ko.observable(true)},{name:'Paris',description:'This is also home',lat:48.857031,lng:2.352018,visible:ko.observable(true)},{name:'New York',description:'I\'ve been to New York, once. Best week-end ever.',lat:40.714425,lng:-73.994817,visible:ko.observable(true)},{name:'Fes',description:'Fes is truly one of the most charming cities in the World',lat:34.015706,lng:-5.007921,visible:ko.observable(true)},];self.listLocations=ko.observableArray(self.locations);let mapHandler=new MapHandler();mapHandler.initMap({lat:self.locations[0].lat,lng:self.locations[0].lng});let markers=[];self.locations.forEach((val,i,t)=>{let infowindow;let marker;marker=new google.maps.Marker({position:{lat:val.lat,lng:val.lng},map:mapHandler.map,title:val.name});infowindow=new google.maps.InfoWindow({content:val.description});marker.addListener('click',function(){infowindow.open(mapHandler.map,marker);self.mapHandler.toggleBounce(marker);});markers.push(marker);});self.__defineGetter__('mapHandler',function(){return mapHandler;});self.__defineGetter__('markers',function(){return markers;});self.__defineGetter__('self',function(){return self;});self.filterLocationsClick=function(data,event){self.searchTerms(data.name);self.filterLocations(data,event);focusOnInput();};let focusOnInput=function(){self.domHandler.focusOnInput();}}
AppViewModel.prototype.locationBeginsWithString=function(location,string){let len=string.length;let res=false;if(location.name.length>=len){res=(location.name.substring(0,len).toLowerCase()==string.toLowerCase());}else{res=false;}
return res;};AppViewModel.prototype.filterLocations=function(data,event){this.locations.forEach((location,index,array)=>{if(this.locationBeginsWithString(location,this.searchTerms())){location.visible(true);this.showMarker(index);}else{location.visible(false);this.hideMarker(index);}});};AppViewModel.prototype.showMarker=function(index){this.markers[index].setMap(this.mapHandler.map);};AppViewModel.prototype.hideMarker=function(index){this.markers[index].setMap(null);};function MapHandler(){let self=this;let map;this.__defineGetter__('map',function(){return map;});this.__defineSetter__('map',function(map_){map=map_;});}
MapHandler.prototype.initMap=function(center_){this.map=new google.maps.Map(document.getElementById('map'),{center:center_,scrollwheel:true,zoom:2,rotateControl:true,streetViewControl:false,zoomControl:true});};MapHandler.prototype.toggleBounce=function(marker){if(marker.getAnimation()!==null){marker.setAnimation(null);}else{marker.setAnimation(google.maps.Animation.BOUNCE);}}
return AppViewModel;});