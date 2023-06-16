import React, { useRef, useState } from "react";
import { MapMarker, Map, MarkerClusterer } from "react-kakao-maps-sdk";
import { Box, useTheme } from "@mui/material";

import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { RootState } from "../../features/configureStore";
import {
  useGetParksDataQuery,
  useGetParksFilteredDataQuery,
  useGetParksFilteredNotContactDataQuery,
  useGetParksNotContactDataQuery,
} from "../../services/parksApi";
import { setThisItem } from "../../features/BasketParkReducer";

const KaKaoParkMap = () => {
  const theme = useTheme();
  const mapRef = useRef<any>();
  const dispatch = useDispatch();

  const { region, pageNumber, filtered, pageFilteredNumber } = useSelector(
    ({ park }: RootState) => ({
      region: park.region,
      pageNumber: park.pageNumber,
      filtered: park.filtered,
      pageFilteredNumber: park.pageFilteredNumber,
    }),
    shallowEqual
  );

  const { data, error, isLoading, isFetching, isSuccess } =
    useGetParksNotContactDataQuery(pageNumber as number);
  const { data2 }: any = useGetParksNotContactDataQuery(
    (pageNumber as number) + 1
  );

  const { data: filteredData } = useGetParksFilteredNotContactDataQuery(
    {
      page: pageFilteredNumber,
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
        (filtered && filteredData?.park[0]?.latitude) ||
        data?.park?.[0]?.latitude ||
        36.2683;
      centerLng =
        (filtered && filteredData?.park[0]?.longitude) ||
        data?.park?.[0]?.longitude ||
        127.6358;
    }

    return { centerLat, centerLng };
  };

  const onClusterclick = (_target: any, cluster: any) => {
    const map = mapRef.current;
    const level = map.getLevel() - 2;
    map.setLevel(level, { anchor: cluster.getCenter() });
  };

  if (isLoading || error || isFetching) {
    return null;
  }

  const EventMarkerContainer = ({ position, onClick }: any) => {
    return (
      <MapMarker
        position={position}
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
      return filteredData?.park?.map((item: any, index: any) => (
        <EventMarkerContainer
          index={index}
          key={`${item.lat}-${item.lng}`}
          position={{
            lat: item.latitude,
            lng: item.longitude,
          }}
          // @ts-ignore
          onClick={() => {
            dispatch(setThisItem(item));
          }}
        />
      ));
    } else {
      return data?.park.map((item: any, index: any) => (
        <EventMarkerContainer
          index={index}
          key={`${item.lat}-${item.lng}`}
          position={{
            lat: item.latitude,
            lng: item.longitude,
          }}
          // @ts-ignore
          onClick={() => {
            dispatch(setThisItem(item));
          }}
        />
      ));
    }
  };

  const showData = () => {
    return (
      <MarkerClusterer
        averageCenter={true}
        minLevel={8}
        disableClickZoom={true}
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
      <Map
        center={{
          lat: calCenter().centerLat,
          lng: calCenter().centerLng,
        }}
        style={{
          width: "100%",
          height: "1000px",
          borderRadius: "3rem",
          marginTop: "1.5vw",
          marginLeft: "1vw",
        }}
        level={13}
        ref={mapRef}
        isPanto={true}
      >
        {showData()}
      </Map>
    </Box>
  );
};

export default KaKaoParkMap;
