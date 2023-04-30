import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Head from 'next/head';
// import styles from 'assets/styles/AboutPage.module.scss'

export default function AboutPage() {
  const theme = useTheme();
  const trigger = useScrollTrigger();

  return (
    <>
      <Head>
        <title>Funiverse</title>
        <meta name="description" content="Funiverse" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Box
        sx={{
          height: `calc(100vh - ${trigger ? 64 : 80}px)`,
          marginTop: `${trigger ? 64 : 80}px`,
        }}> */}
      <Box>
        <Box sx={{ textAlign: 'center', overflow: 'auto' }}>
          <Typography
            variant="h2"
            fontWeight={500}
            sx={{ marginTop: 16 }}
            color="black"
            fontSize="40px"
          >
            About
            <Typography
              component="p"
              variant="h1"
              color={theme.palette.primary.main}
              fontWeight={500}
              fontSize="60px"
            >
              FUniverse
            </Typography>
          </Typography>
          <Typography
            component="p"
            variant="body1"
            width={500}
            margin="0 auto"
            color="black"
            fontSize="18px"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam veritatis totam quae
            suscipit non voluptatibus minima quis laudantium delectus fugiat omnis consequatur harum
            nesciunt ex dicta, ea ratione dolores aperiam.
          </Typography>
        </Box>
      </Box>
      {/* </Box> */}
    </>
  );
}
