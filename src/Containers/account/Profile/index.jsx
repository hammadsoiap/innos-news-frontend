import { Helmet, HelmetProvider } from "react-helmet-async";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import HomeIconOutlined from '@mui/icons-material/HomeOutlined';
import SettingsSuggestOutlinedIcon from '@mui/icons-material/SettingsSuggestOutlined'; 
import PowerSettingsNewIconOutlined from '@mui/icons-material/PowerSettingsNewOutlined';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { logout } from "../../../stores/Auth/actions";

function Profile() {
    const { user } = useSelector(state => state?.AuthReducer);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const callLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <HelmetProvider>
            <Helmet>
                <title>Profile</title>
            </Helmet>
            <Container
                maxWidth="sm"
                sx={{
                    py: '60px'
                }}
            >
                <Card sx={{ pt: 3, pb: 2, px: 4, background:"var(--primary-back)"}}>
                    <CardContent>
                        <Typography variant="h4" component="h2" align="center" mb={2}>
                            Account Information
                            <Typography variant="h5" component="h5">
                            Welcome {user?.name}
                        </Typography>
                        </Typography>
                       
                        <List sx={{color:"var(--primary)"}}>
                            <ListItemButton component={Link} to="/news-search">
                                <ListItemIcon sx={{color:"var(--primary)"}}>
                                    <HomeIconOutlined />
                                </ListItemIcon>
                                <ListItemText primary="Search News"  />
                            </ListItemButton>
                            <ListItemButton component={Link} to="/account/newsfeed">
                                <ListItemIcon sx={{color:"var(--primary)"}}>
                                    <SettingsSuggestOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary="News Feed Setting" />
                            </ListItemButton>
                            <ListItemButton onClick={callLogout}>
                                <ListItemIcon sx={{color:"var(--primary)"}}>
                                    <PowerSettingsNewIconOutlined />
                                </ListItemIcon>
                                <ListItemText primary="Logout" />
                            </ListItemButton>
                        </List>
                    </CardContent>
                </Card>
            </Container>
        </HelmetProvider>
    );
}

export default Profile;
