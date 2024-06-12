import { AppBar, Box, Link, Stack, Toolbar, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { linkStyles, buttonLogin, buttonRegister } from './styles/styles';
import Logo from '../../assets/Logo';

export const NavBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ background: '#1D4ED8' }}>
        <Toolbar >
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ color: '#eff6ff', display: { xs: 'none', sm: 'block' } }}
          >
            <Stack direction='row' justifyContent='center' alignItems='center' spacing={2}>
            <Logo className='w-16'/>
            <div>
              Guardian del Tiempo
            </div>
              
            </Stack>
            
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={5}
          >
            <Link href='#' sx={linkStyles} >Producto</Link>
            <Link href='#' sx={linkStyles}> Caracteristicas</Link>
            <Link href='#' sx={linkStyles}>Nosotros</Link>
          </Stack>
          <Box sx={{ flexGrow: 1 }} />
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Button href='/login' sx={buttonLogin}>
              Ingresar
            </Button>
            <Button href='/register' sx={buttonRegister}>
              Registrarme
            </Button>
          </Stack>

        </Toolbar>

      </AppBar>

    </Box>
  );
}
