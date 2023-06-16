import { useTheme } from '@mui/material/styles';
import { Button } from "@mui/material";
const PrevButton = () => {
  const theme = useTheme();

  return (
    <Button
      sx={{
        backgroundColor: 'primary.main',
        color: 'white',
        fontSize: '0.8rem',
        [theme.breakpoints.only('xs')]: {
          width: '2rem',
          height: '1rem',
        },
        [theme.breakpoints.only('sm')]: {
          width: '2rem',
          height: '1rem',
        },
        [theme.breakpoints.only('md')]: {
          width: '2rem',
          height: '2rem',
        },
        '&:hover': {
          backgroundColor: '#13ab7e',
          color: 'white',
        },
      }}
      onClick={() => window.history.back()}
    >
      뒤로가기
    </Button>
  );
};

export default PrevButton;
