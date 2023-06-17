// 호스팅 환경에 따라 추후 변경
export const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? `http://${window.location.hostname}:5001/`
    : `http://${window.location.hostname}:5001/`;
