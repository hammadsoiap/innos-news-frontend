import {Helmet, HelmetProvider} from 'react-helmet-async';
import {Box, Button, Typography} from '@mui/material';
import { Link } from 'react-router-dom';
import zIndex from '@mui/material/styles/zIndex';

function Home() {
    return (
        <HelmetProvider>
            <Helmet>
                <title>Welcome to Inc News</title>
            </Helmet>
       

            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center" 
                textAlign="center"
            >
                    <img
                    style={{zIndex:-1}}
              width="380"
              src={"/assets/image3.avif"}
            />
                <Typography component="h2" variant="h4">
                    Search news from New York Times ,The Guardian and  News API
                </Typography>
                <br />
                <Link to="/news-search">  
                <Button type="submit" fullWidth size='large' color="primary" variant="outlined">
                                     Search Now
                                    </Button>
                </Link>
            </Box>

        </HelmetProvider>
    )
}

export default Home