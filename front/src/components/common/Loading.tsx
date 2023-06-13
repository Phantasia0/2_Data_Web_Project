import { CircularProgress } from "@mui/material";

const LoadingImage = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress size={200} />
    </div>
  );
};

export default LoadingImage;
