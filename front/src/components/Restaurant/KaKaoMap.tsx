import React, { useEffect, useState, useRef, useMemo } from "react";
import { Map, MapMarker, MarkerClusterer } from "react-kakao-maps-sdk";

import "../../common/styles/all.css";
import { Box, useTheme } from "@mui/material";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { RootState } from "../../features/configureStore";
import { updateData } from "../../features/RestaurantReducer";
import {
  useGetRestaurantsDataQuery,
  useGetRestaurantsFilteredDataQuery,
} from "../../services/restaurantsApi";

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

  const [info, setInfo] = useState<any>();
  const [markers, setMarkers] = useState<any>([]);
  const [map, setMap] = useState<any>();

  useEffect(() => {
    if (!map) return;
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(
      keyword,
      (data: any, status: any, _pagination: any) => {
        if (status === kakao.maps.services.Status.OK) {
          // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
          // LatLngBounds 객체에 좌표를 추가합니다
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

          // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
          map.setBounds(bounds);
        }
      },
      PlaceSearchOption
    );
  }, [map, keyword]);

  return (
    <Map // 로드뷰를 표시할 Container
      center={{
        lat: 37.566826,
        lng: 126.9786567,
      }}
      style={{
        width: "100%",
        height: "1000px",
        
      }}
      level={3}
      onCreate={setMap}
    >
      {markers.map((marker: any) => (
        <MapMarker
          key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
          position={marker.position}
          onClick={() => setInfo(marker)}
        >
          {info && info.content === marker.content && (
            <div style={{ color: "#000" }}>{marker.content}</div>
          )}
        </MapMarker>
      ))}
    </Map>
  );
};

const TotalSearchMap = () => {
  const mapRef = useRef<any>();
  const { region, foodCategory, pageNumber, filtered } = useSelector(
    ({ restaurant }: RootState) => ({
      region: restaurant.region,
      foodCategory: restaurant.foodCategory,
      pageNumber: restaurant.pageNumber,
      filtered: restaurant.filtered,
    }),
    shallowEqual
  );

  const { data, error, isLoading, isFetching, isSuccess } =
    useGetRestaurantsDataQuery(pageNumber as number);
  const { data2 }: any = useGetRestaurantsDataQuery((pageNumber as number) + 1);

  const { data: filteredData } = useGetRestaurantsFilteredDataQuery(
    {
      region: region,
      foodCategory: foodCategory,
    },
    {
      skip: !region && !foodCategory,
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
        (filtered && filteredData?.[0]?.latitude) ||
        data?.restaurant?.[0]?.latitude ||
        36.2683;
      centerLng =
        (filtered && filteredData?.[0]?.longitude) ||
        data?.restaurant?.[0]?.longitude ||
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

  const makeMakerData = () => {
    if (region || foodCategory) {
      return filteredData?.map((item: any) => (
        <MapMarker
          key={`${item.latitude}-${item.longitude}`}
          position={{
            lat: item.latitude,
            lng: item.longitude,
          }}
        ></MapMarker>
      ));
    } else {
      return data?.restaurant.map((item: any) => (
        <MapMarker
          key={`${item.latitude}-${item.longitude}`}
          position={{
            lat: item.latitude,
            lng: item.longitude,
          }}
        ></MapMarker>
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

  return (
    <Map // 지도를 표시할 Container
      center={{
        lat: calCenter().centerLat,
        lng: calCenter().centerLng,
      }}
      style={{
        width: "100%",
        height: "1000px",
        borderRadius: "3rem",
      }}
      level={13} // 지도의 확대 레벨
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
    marginTop:'1.5vw',
    marginLeft:'1vw',
    
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
