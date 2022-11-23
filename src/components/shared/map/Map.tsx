import React from "react";
// import {CustomMap} from './CustomMap';
import "./map.scss";

interface MapProps {
  className?: string;
  style?: object;
  coordinates?: {
    lat: string;
    lng: string;
  };
}

export const Map: React.FC<MapProps> = ({ className, style, coordinates }) => {
  React.useEffect(() => {
    //   let map=document.getElementById('map')
    //  if(map!=null){
    //    const mapElement:HTMLElement=map;
    //    let googleMap=new window.google.maps.Map(mapElement,{
    //      zoom:1,
    //      center:{lat:0,lng:0}
    //    })
    //    const customMap= new window.google.maps.Marker({
    //      map:googleMap,
    //      position:{
    //        lat:coordinates.lat,
    //        lng:coordinates.lng
    //      }
    //    })
    //    //inject the map into the div
    //    mapElement.appendChild(googleMap)
    //   //  mapElement.innerHTML=customMap;
    //  }
  }, []);
  return (
    <div className={`map ${className}`} id="map" style={style}>
      {/* <img 
      src={`https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/pass/GoogleMapTA.jpg`}alt="map" />
       */}
      <iframe
        src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613507864!3d-6.194741395493371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5390917b759%3A0x6b45e67356080477!2sPT%20Kulkul%20Teknologi%20Internasional!5e0!3m2!1sen!2sid!4v1601138221085!5m2!1sen!2sid`}
        // width="600"
        // height="600"
        frameBorder="0"
        style={{ border: 0, width: "100%", height: "30rem" }}
        allowFullScreen={false}
        aria-hidden="false"
        tabIndex={0}
        title="map"
      />
    </div>
  );
};
