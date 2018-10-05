/*global google*/
import React from 'react';

var map;
var markers = [];

class CustomGoogleMaps extends React.Component{
    
    
     constructor(props) {
         super(props);
         this.attachContent = this.attachContent.bind(this);
     }
     
     attachContent(marker, contentString) {
         var infowindow = new google.maps.InfoWindow({content: contentString});
      
         marker.addListener('click', function() {
               infowindow.open(marker.get('map'), marker);
           });
     }
           

     componentDidMount(){
         
        
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -30.0540000, lng: -51.225000},
          zoom: 15
        });
        
        
        for (let mark of this.props.markers) {
            
            
             var contentString = '<div id="content">'+
                                 '<h1 class="textColor">'+mark.title+'</h1>'+
                                 '<div id="bodyContent">'+
                                 '<p class="textColor">' + mark.content + '</p>' +
                                 '<p class="textColor"> fonte do site oficial: <a href= '+ mark.oficial_site +'>' + mark.oficial_site + '<a/></p>'+
                                 '</div>'+
                                 '</div>';

            
            var marker = new google.maps.Marker({
            position: {lat:mark.lat, 
                       lng: mark.lng},
            map: map,
            title: mark.title
            });
            
            markers.push(marker);
            
            this.attachContent(marker, contentString)
    }
}    
     
     componentDidUpdate(){
         
         for (var i = 0; i < markers.length; i++) {
             markers[i].setMap(null);
         }  
        

        for (let mark of this.props.markers) {
            var marker = {lat:mark.lat, lng: mark.lng};
            var marker1 = new google.maps.Marker({
            position: marker,
            map: map,
            title: mark.title
            }); 
            
             var contentString = '<div id="content">'+
                                 '<h1 class="textColor">'+mark.title+'</h1>'+
                                 '<div id="bodyContent">'+
                                 '<p class="textColor">' + mark.content + '</p>' +
                                 '<p class="textColor"> fonte do site oficial: <a href=' + mark.oficial_site+ ' >' + mark.oficial_site + '<a/></p>'+
                                 '</div>'+
                                 '</div>';
             this.attachContent(marker1, contentString);
             
             if(this.props.linkTitle === marker1.title ){
                 marker1.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
                 marker1.setAnimation(google.maps.Animation.DROP);
             } 
            
            markers.push(marker1);
        
        }
     }
     

    render() {
       return ( <div id="map"/> );
   }

}

export default CustomGoogleMaps;
