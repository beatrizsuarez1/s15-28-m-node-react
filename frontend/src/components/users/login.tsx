
import { Box, Button, Divider, Typography, IconButton, Stack } from '@mui/material';
import { FaGoogle, FaGithub, FaLinkedin } from 'react-icons/fa';
import { zodResolver } from "@hookform/resolvers/zod";
import { loginValidation } from '../../Schemas/auth';
import { TextFieldElement, PasswordElement, useForm } from 'react-hook-form-mui'

type FormLogin = {
  email: string,
  password: string,
}

const Login: React.FC = () => {

  const { control, handleSubmit, formState: { isValid } } = useForm<FormLogin>({ resolver: zodResolver(loginValidation) })
  return (
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
          Login
        </Typography>
        <form onSubmit={handleSubmit((data: FormLogin) => console.log(data))}>
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
              Sign In
            </Button>
          </Stack>
        </form>
        <Divider sx={{ my: 3 }}>
          <Typography
            variant="body2"
            color="textSecondary"
          >
            Or Continue With
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
      </Box>
    </Box>
  );

};

export default Login;
