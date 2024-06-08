
import React from 'react';
import { Box, Button, Divider, Typography, IconButton, Stack } from '@mui/material';
import { FaGoogle, FaGithub, FaLinkedin } from 'react-icons/fa';
import { zodResolver } from "@hookform/resolvers/zod";
import { loginValidation } from '../../Schemas/auth';
import { TextFieldElement, PasswordElement, useForm } from 'react-hook-form-mui'
import { FormLogin } from '../../types';
import useAuth from '../../hooks/useAuth';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const Login: React.FC = () => {
  const { login } = useAuth()
  const { control, handleSubmit, formState: { isValid } } = useForm<FormLogin>({ resolver: zodResolver(loginValidation) })
  return (
    <React.Fragment >
      <ToastContainer />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        bgcolor="#f5f5f5"
      >

        <Box
          p={4}
          bgcolor="#f8fafc"
          borderRadius={3}
          boxShadow={2}
          width='80vw'
          maxWidth={600}

        >
          <Typography
            variant="h5"
            component="h2"
            textAlign="center"
            mb={3}
          >
            LOGO
          </Typography>
          <form onSubmit={handleSubmit((data: FormLogin) => login(data))}>
            <Stack spacing={4}>
              <TextFieldElement
                fullWidth
                name={'email'}
                label={'Email'}
                control={control}
                placeholder='correo123@gmail.com'
              />
              <PasswordElement
                fullWidth
                name={'password'}
                label={'Password'}
                control={control}
                placeholder='12345678'
              />
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                disabled={!isValid}
              >
                Iniciar sesión
              </Button>
            </Stack>
          </form>
          <Divider sx={{ my: 3 }}>
            <Typography
              variant="body2"
              color="textSecondary"
            >
              O continuar con
            </Typography>
          </Divider>
          <Box display="flex" justifyContent="center" gap={2}>
            <IconButton aria-label="google" color="error">
              <FaGoogle />
            </IconButton>
            <IconButton aria-label="linkedin" color="primary">
              <FaLinkedin />
            </IconButton>
            <IconButton aria-label="github" color="inherit">
              <FaGithub />
            </IconButton>
          </Box>

          <Typography
            variant="body2"
            color="textSecondary"
            textAlign="center"
            mt={3}
          >
            ¿No tienes una cuenta?{" "}
            <a href="/register" style={{ color: "#1976d2" }}>
              Registrarme
            </a>
          </Typography>
        </Box>
      </Box>
    </React.Fragment>
  );

};

export default Login;

