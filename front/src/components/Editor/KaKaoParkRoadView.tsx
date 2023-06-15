import React, { FC } from "react";
import { Roadview, RoadviewMarker } from "react-kakao-maps-sdk";
import { Park } from "../../models/park.model";

interface KaKaoParkRoadViewProps {
  spotData: Park;
}

const KaKaoParkRoadView: FC<KaKaoParkRoadViewProps> = ({ spotData }) => {
  console.log(spotData);
  const placePosition = {
    lat: spotData?.latitude,
    lng: spotData?.longitude,
  };

  return (
    <Roadview
      position={{ ...placePosition, radius: 100 }}
      style={{
        width: "100%",
        height: "200px",
      }}
    >
      <RoadviewMarker position={placePosition} />
    </Roadview>
  );
};

export default KaKaoParkRoadView;
