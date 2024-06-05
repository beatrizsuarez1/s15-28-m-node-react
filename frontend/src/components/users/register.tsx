import React from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  TextField,
  Typography,

} from "@mui/material";
import { FaGithub, FaGoogle, FaLinkedin } from "react-icons/fa";
import { DateFnsProvider } from 'react-hook-form-mui/date-fns'
import { DatePickerElement } from "react-hook-form-mui/date-pickers";
// import {
//   validateName,
//   validateEmail,
//   validatePassword,
//   validatePhone,
//   validateBirthDate,
// } from "./validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerValidation } from '../../Schemas/auth';
import { TextFieldElement, PasswordElement, useForm, PasswordRepeatElement } from 'react-hook-form-mui'



interface FormRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: number;
  isRole?: string;
  birthDate: string;
  phone: string;
}

const Register: React.FC = () => {
  const { control, handleSubmit, formState: { isValid } } = useForm<FormRegister>({ resolver: zodResolver(registerValidation) })



  //   const [firstName, setFirstName] = useState<string>("");
  //   const [lastName, setLastName] = useState<string>("");
  //   const [email, setEmail] = useState<string>("");
  //   const [password, setPassword] = useState<string>("");
  //   const [confirmPassword, setConfirmPassword] = useState<string>("");
  //   const [role, setRole] = useState<number>(0);
  //   const [birthDate, setBirthDate] = useState<string>("");
  //   const [phone, setPhone] = useState<string>("");
  //   const [errors, setErrors] = useState<Errors>({
  //     firstName: "",
  //     lastName: "",
  //     email: "",
  //     password: "",
  //     confirmPassword: "",
  //     role: 0,
  //     isRole: "",
  //     birthDate: "",
  //     phone: "",
  //   });
  //   const [showPassword, setShowPassword] = useState<boolean>(false);
  //   const [showConfirmPassword, setShowConfirmPassword] =
  //     useState<boolean>(false);
  //   const [valid, setValid] = useState<boolean>(true);



  // const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
  //   e.preventDefault();
  //   const newErrors: Errors = {
  //     firstName: "",
  //     lastName: "",
  //     email: "",
  //     password: "",
  //     confirmPassword: "",
  //     role: 0,
  //     birthDate: "",
  //     phone: "",
  //   };

  //   if (!validateName(firstName)) {
  //     newErrors.firstName = "Please enter a valid first name.";
  //     setValid(false);
  //   }

  //   if (!validateName(lastName)) {
  //     newErrors.lastName = "Please enter a valid last name.";
  //     setValid(false);
  //   }

  //   if (!validateEmail(email)) {
  //     newErrors.email = "Please enter a valid email address.";
  //     setValid(false);
  //   }

  //   if (!validatePassword(password)) {
  //     newErrors.password =
  //       "Password must be 8-30 characters long and include a number, a symbol, an uppercase and a lowercase letter.";
  //     setValid(false);
  //   }

  //   if (password !== confirmPassword) {
  //     newErrors.confirmPassword = "Passwords do not match.";
  //     setValid(false);
  //   }

  //   if (!role) {
  //     newErrors.isRole = "Please select your role.";
  //     setValid(false);
  //   }

  //   if (!birthDate || !validateBirthDate(birthDate)) {
  //     newErrors.birthDate = "Please enter a valid birth date.";
  //     setValid(false);
  //   }

  //   if (!phone && !validatePhone(phone)) {
  //     newErrors.phone = "Please enter a valid phone number.";
  //     setValid(false);
  //   }
  //   setErrors(newErrors);

  //   if (valid) {
  //     // Submit the form or perform other actions
  //     console.log("Form submitted:", {
  //       "first_name": firstName,
  //       "last_name": lastName,
  //       "email": email,
  //       "password": password,
  //       "role_id": role,
  //       "birthdate": birthDate,
  //       "phone": phone,
  //     });
  //   }

  //   setFirstName("");
  //   setLastName("");
  //   setEmail("");
  //   setPassword("");
  //   setConfirmPassword("");
  //   setRole(0);
  //   setBirthDate("");
  //   setPhone("");
  // };
  //   const handleClickShowPassword = () => {
  //     setShowPassword(!showPassword);
  //   };

  //   const handleClickShowConfirmPassword = () => {
  //     setShowConfirmPassword(!showConfirmPassword);
  //   };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
    >
      <Box textAlign="center" mb={3}>
        <Typography variant="h5" component="h2" mb={1}>
          Get started with TimeTracker
        </Typography>
        <Typography variant="body1">
          Create a free account to start tracking time and supercharge your
          productivity.
        </Typography>
      </Box>

      <Box p={4} bgcolor="white" borderRadius={2} boxShadow={3} width={300}>
        <Typography variant="h5" component="h2" textAlign="center" mb={3}>
          Sign Up
        </Typography>
        <DateFnsProvider>
          <form onSubmit={handleSubmit((data: FormRegister) => console.log(data))}>
            <Box mb={2}>
              <TextFieldElement
                fullWidth
                name={'firstName'}
                label={'Nombre'}
                control={control}
                placeholder='Juan'
              />
            </Box>
            <Box mb={2}>
              <TextFieldElement
                fullWidth
                name={'lastName'}
                label={'Apellido'}
                control={control}
                placeholder='perez'
              />
            </Box>
            <Box mb={2}>
              <TextFieldElement
                fullWidth
                name={'email'}
                label={'Correo'}
                control={control}
                placeholder='keeper@gmail.com'
              />
            </Box>
            <Box mb={2}>
              <PasswordElement
                fullWidth
                name={'password'}
                label={'Contraseña'}
                control={control}
                placeholder='12345678'
              />
            </Box>
            <Box mb={2}>
              <PasswordRepeatElement
                fullWidth
                name={'confirmPassword'}
                label={'Confirma Contraseña'}
                passwordFieldName={'password'}
                control={control}
              />
            </Box>
            {/* <Box mb={2}>
            <FormControl
              fullWidth
              variant="outlined"
              size="small"
              error={!!errors.role}
            >
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId="role-label"
                id="role"
                value={role}
                onChange={(e) => e.target.value === "0" ? setRole(1) : setRole(2)}
                label="Role"
              >
                <MenuItem value="0">Freelancer</MenuItem>
                <MenuItem value="1">Client</MenuItem>
              </Select>
              {errors.isRole && (
                <Typography variant="body2" color="error">
                  {errors.isRole}
                </Typography>
              )}
            </FormControl>
          </Box> */}
            {/* <DatePickerElement name={'birthDate'} control={control} /> <br /> */}

            <DatePickerElement name={'birthDate'} control={control} /> <br />

            {/* <TextField
              fullWidth
              label="Phone"
              variant="outlined"
              size="small"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              error={!!errors.phone}
              helperText={errors.phone}
            />
          </Box> */}
            <Button fullWidth type="submit" variant="contained" color="primary">
              Sign Up
            </Button>
          </form>
        </DateFnsProvider>
        <Divider sx={{ my: 3 }}>
          <Typography variant="body2" color="textSecondary">
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
        <Typography
          variant="body2"
          color="textSecondary"
          textAlign="center"
          mt={3}
        >
          Already have an account?{" "}
          <a href="/login" style={{ color: "#1976d2" }}>
            Login
          </a>
        </Typography>
      </Box>
    </Box>
  );
};

export default Register;
