import React, { FC } from "react";
import { MapMarker, Map, Roadview, RoadviewMarker } from "react-kakao-maps-sdk";
import { Park } from "../../models/park.model";

interface KaKaoParkRoadViewProps {
  data: Park;
}

const KaKaoParkRoadView: FC<KaKaoParkRoadViewProps> = ({ data }) => {
  const placePosition = {
    lat: data.latitude,
    lng: data.longitude,
  };

  return (
    <div style={{ display: "flex", width: "100%" }}>
      <Map
        center={placePosition}
        style={{
          // 지도의 크기
          width: "100%",
          height: "400px",
        }}
        level={3}
      >
        <MapMarker position={placePosition} />
      </Map>
      <Roadview
        position={{ ...placePosition, radius: 100 }}
        style={{
          width: "100%",
          height: "400px",
        }}
      >
        <RoadviewMarker position={placePosition} />
      </Roadview>
    </div>
  );
};

export default KaKaoParkRoadView;
