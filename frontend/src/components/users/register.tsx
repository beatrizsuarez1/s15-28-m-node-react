import React from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,

} from "@mui/material";
import { FaGithub, FaGoogle, FaLinkedin } from "react-icons/fa";
import { DateFnsProvider } from 'react-hook-form-mui/date-fns'
import { DatePickerElement } from "react-hook-form-mui/date-pickers";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerValidation } from '../../Schemas/auth';
import { TextFieldElement, PasswordElement, useForm, SelectElement } from 'react-hook-form-mui'
import { FormRegister } from "../../types"



const Register: React.FC = () => {
  const { control, handleSubmit, formState: { isValid } } = useForm<FormRegister>({ resolver: zodResolver(registerValidation) })

  const options = [
    { id: 'freelance', label: 'Freelance' },
    { id: 'cliente', label: 'Cliente' },

  ]
  const onKeyNumbers = (e: React.KeyboardEvent): void => {
    if (!/^([0-9])*$/.test(e.key) && e.key !== "Backspace") {
      e.preventDefault();
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
      p={4}
    >
      <Box textAlign="center" mb={3}>
        <Typography variant="h5" component="h2" mb={1}>
          Empieza a utilizar TimeTracker
        </Typography>
        <Typography variant="body1">
          Crea una cuenta gratuita para empezar a controlar el tiempo y aumenta tu productividad.
        </Typography>
      </Box>

      <Box
        p={4}
        bgcolor="white"
        borderRadius={2}
        boxShadow={3}
        width='80vw'
        maxWidth={600}
      >
        <Typography variant="h5" component="h2" textAlign="center" mb={3}>
          Regístrate
        </Typography>
        <DateFnsProvider>
          <form onSubmit={handleSubmit((data: FormRegister) => console.log(data))}>
            <Stack spacing={2}>
              <TextFieldElement
                fullWidth
                name={'firstName'}
                label={'Nombre'}
                control={control}
                placeholder='Juan'
              />
              <TextFieldElement
                fullWidth
                name={'lastName'}
                label={'Apellido'}
                control={control}
                placeholder='perez'
              />
              <TextFieldElement
                fullWidth
                name={'email'}
                label={'Correo'}
                control={control}
                placeholder='keeper@gmail.com'
              />
              <Stack direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 4 }}>
                <PasswordElement
                  fullWidth
                  name={'password'}
                  label={'Contraseña'}
                  placeholder='12345678'
                  control={control}
                />
                <PasswordElement
                  fullWidth
                  name={'confirmPassword'}
                  label={'Confirma Contraseña'}
                  control={control}
                />
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 4 }}>
                <TextFieldElement
                  fullWidth
                  name={'phone'}
                  label={'Celular'}
                  control={control}
                  placeholder='1232-123-1233'
                  onKeyDown={onKeyNumbers}
                />
                <SelectElement
                  name={'role'}
                  label={'Rol'}
                  control={control}
                  options={options}
                  sx={{width: '20vw'}}
                />
              </Stack>

              <DatePickerElement name={'birthDate'} control={control} /> <br />

              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                disabled={!isValid}
              >
                Crear Cuenta
              </Button>
            </Stack>
          </form>
        </DateFnsProvider>
        <Divider sx={{ my: 3 }}>
          <Typography variant="body2" color="textSecondary">
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
          ¿Ya tiene una cuenta?{" "}
          <a href="/login" style={{ color: "#1976d2" }}>
            Iniciar sesión
          </a>
        </Typography>
      </Box>
    </Box>
  );
};

export default Register;
