import React, { useRef, useState } from "react";
import { MapMarker, useMap, Map, MarkerClusterer } from "react-kakao-maps-sdk";
import { Box, useTheme } from "@mui/material";

import { useSelector, shallowEqual } from "react-redux";
import { RootState } from "../../features/configureStore";
import { updateData } from "../../features/ParkReducer";
import {
  useGetParksDataQuery,
  useGetParksFilteredDataQuery,
} from "../../services/parksApi";

const KaKaoParkMap = () => {
  const theme = useTheme();
  const mapRef = useRef<any>();
  const [selectedMarker, setSeleteMarker] = useState<any>();

  const { region, pageNumber, filtered } = useSelector(
    ({ park }: RootState) => ({
      region: park.region,
      pageNumber: park.pageNumber,
      filtered: park.filtered,
    }),
    shallowEqual
  );

  const { data, error, isLoading, isFetching, isSuccess } =
    useGetParksDataQuery(pageNumber as number);
  const { data2 }: any = useGetParksDataQuery((pageNumber as number) + 1);

  const { data: filteredData } = useGetParksFilteredDataQuery(
    {
      region: region,
    },
    {
      skip: !region,
      // @ts-ignore
      refetchOnArgChange: true,
    }
  );

  const responsiveStyle = {
    width: "100%",
    height: "50%",
    [theme.breakpoints.down("sm")]: {
      height: "100%",
      width: "50%",
    },
  };

  const calCenter = () => {
    let centerLat,
      centerLng = null;
    if (mapRef?.current?.getLevel() >= 12) {
      centerLat = 36.2683;
      centerLng = 127.6358;
    } else {
      centerLat =
        (filtered && filteredData?.[0]?.latitude) ||
        data?.park?.[0]?.latitude ||
        36.2683;
      centerLng =
        (filtered && filteredData?.[0]?.longitude) ||
        data?.park?.[0]?.longitude ||
        127.6358;
    }

    return { centerLat, centerLng };
  };

  const onClusterclick = (_target: any, cluster: any) => {
    const map = mapRef.current;
    // 현재 지도 레벨에서 1레벨 확대한 레벨
    const level = map.getLevel() - 2;

    // 지도를 클릭된 클러스터의 마커의 위치를 기준으로 확대합니다
    map.setLevel(level, { anchor: cluster.getCenter() });
  };

  if (isLoading || error || isFetching) {
    return null;
  }

  const EventMarkerContainer = ({ position, onClick, isClicked }: any) => {
    if (isClicked) {
    }

    return (
      <MapMarker
        position={position} // 마커를 표시할 위치
        onClick={onClick}
        image={{
          src: "https://cdn0.iconfinder.com/data/icons/aami-flat-map-pins-and-navigation/64/location-11-512.png",
          size: {
            width: 64,
            height: 64,
          },
          options: {
            offset: {
              x: 27,
              y: 69,
            },
          },
        }}
      ></MapMarker>
    );
  };

  const makeMakerData = () => {
    if (region) {
      return filteredData?.map((item: any, index) => (
        <EventMarkerContainer
          index={index}
          key={`${item.lat}-${item.lng}`}
          position={{
            lat: item.latitude,
            lng: item.longitude,
          }}
          // @ts-ignore
          onClick={() => setSeleteMarker(index)}
          isClicked={selectedMarker === index}
        />
      ));
    } else {
      return data?.park.map((item: any, index) => (
        <EventMarkerContainer
          index={index}
          key={`${item.lat}-${item.lng}`}
          position={{
            lat: item.latitude,
            lng: item.longitude,
          }}
          // @ts-ignore
          onClick={() => setSeleteMarker(index)}
          isClicked={selectedMarker === index}
        />
      ));
    }
  };

  const showData = () => {
    return (
      <MarkerClusterer
        averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
        minLevel={8} // 클러스터 할 최소 지도 레벨
        disableClickZoom={true} // 클러스터 마커를 클릭했을 때 지도가 확대되지 않도록 설정한다
        // 마커 클러스터러에 클릭이벤트를 등록합니다
        // 마커 클러스터러를 생성할 때 disableClickZoom을 true로 설정하지 않은 경우
        // 이벤트 헨들러로 cluster 객체가 넘어오지 않을 수도 있습니다
        onClusterclick={onClusterclick}
      >
        {makeMakerData()}
      </MarkerClusterer>
    );
  };

  if (isLoading || error || isFetching) {
    return null;
  }

  return (
    <Box sx={responsiveStyle}>
      <Map // 지도를 표시할 Container
        center={{
          lat: calCenter().centerLat,
          lng: calCenter().centerLng,
        }}
        style={{
          width: "100%",
          height: "1000px",
          borderRadius: "3rem",
          marginTop:'1.5vw',
          marginLeft:'1vw',
        }}
        level={13} // 지도의 확대 레벨
        ref={mapRef}
        isPanto={true}
      >
        {showData()}
      </Map>
    </Box>
  );
};

export default KaKaoParkMap;
