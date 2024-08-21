import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { createTheme, ThemeProvider } from "@mui/material";
import { Link } from "react-router-dom";
import './style.scss';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../stores/Auth/actions";
import { useNavigate } from "react-router";

const settings = [
    { 'name': 'Profile', 'route': '/account/profile' },
    { 'name': 'News Preference', 'route': '/account/newsfeed' },
];

function Header() {
    const { isAuthenticated } = useSelector(state => state?.AuthReducer);

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const darkTheme = createTheme({
        palette: {
            mode: 'light',
            primary: {
                main: '#fff',
            },
        },
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const callLogout = () => {
        dispatch(logout());
        navigate('/login');
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <AppBar position="static" color="primary" id="top_header">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                         
                        <Box  sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}> 
                        <img src="/assets/innos.jpg" style={{width:'60px'}} /></Box>
                        <Typography
                            variant="h6"
                            noWrap
                            component={Link}
                            to="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Innos News
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                 {settings.map((setting) => (
                                        <MenuItem key={setting.name} component={Link} to={setting.route} onClick={handleCloseUserMenu}>
                                            <Typography textAlign="center">{setting.name}</Typography>
                                        </MenuItem>
                                    ))}
                                    <MenuItem key="logout" onClick={() => callLogout()}>
                                        <Typography textAlign="center">Logout</Typography>
                                    </MenuItem>
                            </Menu>
                        </Box>
                        <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1}}> 
                            <img src="/assets/innos.jpg" style={{width:'60px'}} /></Box>
                        <Typography
                            variant="h5"
                            noWrap
                            component={Link}
                            to="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Innos News
                        </Typography>
                        {!isAuthenticated ?
                            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, flexDirection: 'row-reverse' }}>
                                <MenuItem key="register" component={Link} to="/register">
                                    <Typography textAlign="center">Register</Typography>
                                </MenuItem>
                                <MenuItem key="login" component={Link} to="/login">
                                    <Typography textAlign="center">Login</Typography>
                                </MenuItem>
                            </Box>
                            :
                            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, flexDirection: 'row-reverse' }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {settings.map((setting) => (
                                        <MenuItem key={setting.name} component={Link} to={setting.route} onClick={handleCloseUserMenu}>
                                            <Typography textAlign="center">{setting.name}</Typography>
                                        </MenuItem>
                                    ))}
                                    <MenuItem key="logout" onClick={() => callLogout()}>
                                        <Typography textAlign="center">Logout</Typography>
                                    </MenuItem>
                                </Menu>
                            </Box>
                        }
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    );
}

export default Header;
