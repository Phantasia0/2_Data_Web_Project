import React, { useEffect, useState, useRef } from "react";
import { Map, MapMarker, MarkerClusterer } from "react-kakao-maps-sdk";
import { Box, useTheme } from "@mui/material";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { RootState } from "../../features/configureStore";
import { updateData } from "../../features/RestaurantReducer";
import {
  useGetRestaurantNotContactDataQuery,
  useGetRestaurantsDataQuery,
  useGetRestaurantsFilteredDataQuery,
  useGetRestaurantsFilteredNotContactDataQuery,
} from "../../services/restaurantsApi";
// @ts-ignore
import { setThisItem } from "../../features/BasketReducer";

const { kakao }: any = window;

const KeywordSearchMap = () => {
  const dispatch = useDispatch();
  const { keyword } = useSelector(
    ({ restaurant }: RootState) => ({
      keyword: restaurant.keyword,
    }),
    shallowEqual
  );

  const PlaceSearchOption = {
    page: 1,
  };

  const [markers, setMarkers] = useState<any>([]);
  const [map, setMap] = useState<any>();

  useEffect(() => {
    if (!map) return;
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(
      keyword,
      (data: any, status: any, _pagination: any) => {
        if (status === kakao.maps.services.Status.OK) {
          const bounds = new kakao.maps.LatLngBounds();
          let markers = [];

          for (let i = 0; i < data.length; i++) {
            // @ts-ignore
            markers.push({
              position: {
                lat: data[i].y,
                lng: data[i].x,
              },
              content: data[i].place_name,
            });
            // @ts-ignore
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
          }
          // @ts-ignore
          setMarkers(markers);
          dispatch(
            updateData({
              data: data,
            })
          );

          map.setBounds(bounds);
        }
      },
      PlaceSearchOption
    );
  }, [map, keyword]);

  return (
    <Map
      center={{
        lat: 37.566826,
        lng: 126.9786567,
      }}
      style={{
        width: "100%",
        height: "1000px",
        borderRadius: "3rem",
      }}
      level={3}
      onCreate={setMap}
    >
      {markers.map((marker: any) => (
        <MapMarker
          key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
          position={marker.position}
        ></MapMarker>
      ))}
    </Map>
  );
};

const TotalSearchMap = () => {
  const mapRef = useRef<any>();
  const dispatch = useDispatch();
  const { region, foodCategory, pageNumber, filtered, pageFilteredNumber } =
    useSelector(
      ({ restaurant }: RootState) => ({
        region: restaurant.region,
        foodCategory: restaurant.foodCategory,
        pageNumber: restaurant.pageNumber,
        filtered: restaurant.filtered,
        pageFilteredNumber: restaurant.pageFilteredNumber,
      }),
      shallowEqual
    );

  const { data, error, isLoading, isFetching, isSuccess } =
    useGetRestaurantNotContactDataQuery(pageNumber as number);
  const { data2 }: any = useGetRestaurantNotContactDataQuery(
    (pageNumber as number) + 1
  );

  const { data: filteredData } = useGetRestaurantsFilteredNotContactDataQuery(
    {
      page: pageFilteredNumber,
      region: region,
      foodCategory: foodCategory,
    },
    {
      skip: !region,
      // @ts-ignore
      refetchOnArgChange: true,
    }
  );

  const calCenter = () => {
    let centerLat,
      centerLng = null;
    if (mapRef?.current?.getLevel() >= 12) {
      centerLat = 36.2683;
      centerLng = 127.6358;
    } else {
      centerLat =
        (filtered && filteredData?.restaurant?.[0]?.latitude) ||
        data?.restaurant?.[0]?.latitude ||
        36.2683;
      centerLng =
        (filtered && filteredData?.restaurant?.[0]?.longitude) ||
        data?.restaurant?.[0]?.longitude ||
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

  const makeMakerData = () => {
    console.log("rendered");
    if (region || foodCategory) {
      return filteredData?.restaurant?.map((item: any) => (
        <>
          <MapMarker
            key={`${item.latitude}-${item.longitude}`}
            position={{
              lat: item.latitude,
              lng: item.longitude,
            }}
            onClick={() => {
              dispatch(setThisItem(item));
            }}
          ></MapMarker>
        </>
      ));
    } else {
      return data?.restaurant.map((item: any) => (
        <MapMarker
          key={`${item.latitude}-${item.longitude}`}
          position={{
            lat: item.latitude,
            lng: item.longitude,
          }}
          onClick={() => {
            dispatch(setThisItem(item));
          }}
        ></MapMarker>
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

  return (
    <Map
      center={{
        lat: calCenter().centerLat,
        lng: calCenter().centerLng,
      }}
      style={{
        width: "100%",
        height: "1000px",
        borderRadius: "3rem",
      }}
      level={13}
      ref={mapRef}
      isPanto={true}
    >
      {showData()}
    </Map>
  );
};

const KaKaoMap = () => {
  const theme = useTheme();
  const { keyword } = useSelector(
    ({ restaurant }: RootState) => ({
      keyword: restaurant.keyword,
    }),
    shallowEqual
  );

  const responsiveStyle = {
    width: "100%",
    height: "50%",
    marginTop: "1.5vw",
    marginLeft: "1vw",

    [theme.breakpoints.down("sm")]: {
      height: "100%",
      width: "50%",
    },
  };

  // @ts-ignore
  return (
    <Box sx={responsiveStyle}>
      {keyword ? <KeywordSearchMap /> : <TotalSearchMap />}
    </Box>
  );
};

export default KaKaoMap;
