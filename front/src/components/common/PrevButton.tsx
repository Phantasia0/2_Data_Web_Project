import { Button } from "@mui/material";
const PrevButton = () => {
  return (
    <Button
      sx={{
        backgroundColor: "primary.main",
        color: "white",
        "&:hover": {
          backgroundColor: "green",
          color: "white",
        },
      }}
      onClick={() => window.history.back()}
    >
      뒤로가기
    </Button>
  );
};

export default PrevButton;
