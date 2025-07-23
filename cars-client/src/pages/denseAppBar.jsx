import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';


const navItems = [
    { label: 'Главная', path: '/' },
    { label: 'О нас', path: '/about' },
    { label: 'Контакты', path: '/contact' },
];

export default function DenseAppBar() {
    return (
        <AppBar position="static">
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div">
                        Мой сайт
                    </Typography>
                </Box>
                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                    {navItems.map((item) => (
                        <Button
                            key={item.path}
                            component={Link}
                            to={item.path}
                            sx={{ color: 'white', mx: 1 }}
                        >
                            {item.label}
                        </Button>
                    ))}
                </Box>
                <Box sx={{ width: 48 }} />
            </Toolbar>
        </AppBar>
    );
}