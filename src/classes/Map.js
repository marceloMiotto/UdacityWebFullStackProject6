import React from 'react';
import CustomGoogleMaps from './CustomGoogleMaps';


class Map extends React.Component{
     constructor(props) {
         super(props);
         this.openNav = this.openNav.bind(this);
         
     }
   
     openNav() {
         document.getElementById("mySidenav").style.width = "250px";
         document.getElementById("content").style.marginLeft = "250px";
         document.getElementById("buttonOpen").style.display = "none";
     }

    render() {
       return (<div id="content" className="container">
                   <span id="buttonOpen" onClick={() => this.openNav()}>&#9776; </span>
                   <CustomGoogleMaps markers= {this.props.markers}/>
               </div>
              );
   }

}

export default Map;
