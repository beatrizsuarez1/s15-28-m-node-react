import { User } from "../models/users.model";

// Validate field Requirements.
const isRequired = (inputValue: any, field: string): string | null => {
  return !inputValue ? `El ${field} es requerido.` : null;
};

//validate field string.
const isString = (inputValue: any, field: string): string | null => {
  return typeof inputValue !== "string" ? `El ${field} no es un texto.` : null;
};

// Validate field number.
const isNumber = (inputValue: any, field: string): string | null => {
  return typeof inputValue !== "number" ? `El ${field} no es un número.` : null;
};

// Validate field date.
const isDate = (inputValue: any, field: string): string | null => {
  return Number.isNaN(Date.parse(inputValue))
    ? `El ${field} no es una fecha válida.`
    : null;
};

//validate field not empty.
const isNotEmpty = (inputValue: any, field: string): string | null => {
  return inputValue.length === 0 ? `El ${field} no puede estar vacío.` : null;
};

// Validate field age.
const isValidateAge = (inputValue: any, field: string): string | null => {
  const birthDate = new Date(inputValue);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0) if (m === 0) if (today.getDate() < birthDate.getDate()) age--;
  return age >= 19 && age <= 99
    ? null
    : `El ${field} debe ser mayor de 18 y menor de 99.`;
};

//validate field requirements.
const hasValidateRequirements = (
  inputValue: any,
  field: string,
  regexArg: any
): string | null => {
  const error = regexArg
    .map((reg: any) => {
      return reg.reg.test(inputValue) ? null : `El ${field} ${reg.msn}`;
    })
    .filter((err: any) => err !== null)[0];
  return error || null;
};

//format value first_name and last_name.
const formatValue = (inputValue: string): string => {
  return inputValue
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// User models  keys
const userKeys = Object.keys(User.getAttributes());

// Validate avatar.
const validateAvatar = (inputValue: string, field: string): string => {
  /*
  Validación de Fotografía:
    Campo no obligatorio. ok
    Formatos permitidos: png, jpg
    Menor o igual a 1Mb. frontend ok
    Nombre del archivo: mínimo 2 caracteres alfanuméricos (puede incluir espacios y símbolos - _ ) y máximo 50. Más la extención (.jpg, .png) las api
  */
  const regexArgImage = [
    {
      reg: /\.(jpg|png)$/,
      msn: "debe ser de formato .jpg o .png.",
    },
  ];
  const errors =
    isRequired(inputValue, field) ??
    isNotEmpty(inputValue, field) ??
    isString(inputValue, field) ??
    hasValidateRequirements(inputValue, field, regexArgImage);
  return errors ?? inputValue;
};
// Validate Filed first_name and last_name.
const validateField = (inputValue: string, field: string): string => {
  /*
  valida campo para nombre y apellido:
    Campo obligatorio. ok
    Campo de texto. ok
    Se permite caracteres alfabéticos (se permite ñ, á, é, í, ó, ú, ú, Á, É, Í, Ó, Ú). ok
    Se permiten espacios (No al inicio). ok
    No permite ingresar números y caracteres especiales. ok
      Mínimo de 2 caracteres, máximo 30 caracteres.ok
  */
  inputValue = inputValue.trim();
  const regexArgField = [
    {
      reg: /^\D+$/,
      msn: "no debe tener caracteres numéricos.",
    },
    {
      reg: /^[a-zA-ZñáéíóúÁÉÍÓÚ\s]+$/,
      msn: "Solo se permiten esto caracteres: ñ, á, é, í, ó, ú, ú, Á, É, Í, Ó, Ú.",
    },
    {
      reg: /^\S+(\s\S+)*$/,
      msn: "no debe tener doble espacio.",
    },
    {
      reg: /^.{2,30}$/,
      msn: "debe tener entre 8 y 30 caracteres.",
    },
  ];
  const errors =
    isRequired(inputValue, field) ??
    isString(inputValue, field) ??
    isNotEmpty(inputValue, field) ??
    hasValidateRequirements(inputValue, field, regexArgField);
  return errors ?? formatValue(inputValue);
};

// Validate email.
const validateEmail = (inputValue: string, filed: string): string => {
  /*
    Validación del Email:
      Campo obligatorio. ok
      Campo de texto. ok
      No se permiten espacios. ok
      Máximo total de caracteres debe ser de 255, mínimo de 6. ok
      Debe tener un @ ok
      Estructura algo@algo.algo que debe cumplir lo siguiente:
        Antes del @ permite: caracteres alfanuméricos y solo los símbolos - _ . + ok
        Antes del @ debe tener un mínimo de 1 y hasta 64 caracteres. ok
        Antes del @ No puede comenzar ni terminar con un . ok
        Antes del @ No puede haber dos . seguidos. ok
        Después del @ permite: caracteres alfabéticos y solo los símbolos . -. ok
        Después del @ debe contener un . ok
        Después del @ la cantidad de caracteres debe estar comprendida entre 4 y 255 caracteres. ok
        Los caracteres después del . posterior al @ debe contener: un mínimo 2 máximo 10 ok
  */
  const regexArgEmail = [
    {
      reg: /^[a-zA-Z0-9-_.]+@[^@]+$/,
      msn: "antes del @ solo se permiten caracteres alfanuméricos y solo los símbolos - _ .",
    },
    {
      reg: /^[a-zA-Z0-9-_.]{1,64}@[^@]+$/,
      msn: "antes del @ debe tener entre 1 y 64 caracteres.",
    },
    {
      reg: /^(?!.*\.{2})[^\s]+$/,
      msn: "no se puede tener varios puntos seguidos.",
    },
    {
      reg: /^[^.].*[^.]@/,
      msn: "antes del @ no puede comenzar ni terminar con un punto.",
    },
    {
      reg: /@.{4,255}$/,
      msn: "después del @ debe tener entre 4 y 255 caracteres.",
    },
    {
      reg: /@[a-zA-Z.-]+$/,
      msn: "Después del @ solo se permiten caracteres alfabéticos y solo los símbolos . -.",
    },
    {
      reg: /@.*\..*$/,
      msn: "Después del @ debe contener un .",
    },
    {
      reg: /@[^.].*[^.]$/,
      msn: "Después del @ no puede comenzar ni terminar con un punto.",
    },
    {
      reg: /\.[a-zA-Z]{2,10}$/,
      msn: "los caracteres después del . posterior al @ deben tener entre 2 y 10 caracteres.",
    },
    {
      reg: /^.{6,255}$/,
      msn: "el email debe tener entre 6 y 255 caracteres.",
    },
    {
      reg: /^[^ ]+[^ ]+\.[^ ]+$/,
      msn: "no se permiten tener espacios.",
    },
    {
      reg: /^[^@]+@[^@]+$/,
      msn: "solo puede haber un @ en el email.",
    },
  ];
  inputValue = inputValue.trim();
  const errors =
    isRequired(inputValue, filed) ??
    isString(inputValue, filed) ??
    isNotEmpty(inputValue, filed) ??
    hasValidateRequirements(inputValue, filed, regexArgEmail);
  return errors ?? inputValue.toLowerCase();
};

// validate password
const validatePassword = (password: string): string => {
  /*
  validación de Password:
    Campo obligatorio.
    Campo de texto.
    Mínimo 8 caracteres y máximo 30.
    Se permite caracteres alfanuméricos y caracteres especiales.
    No se permiten espacios.
    Se debe incluir de forma obligatoria:
      un número,
      un símbolo especial,
      un carácter en minúscula,
      un carácter en mayúscula.
  */
  const regexArgPassword = [
    {
      reg: /[A-Z]/,
      msn: " debe tener por lo menos una letra mayúscula.",
    },
    {
      reg: /[a-z]/,
      msn: " debe tener por lo menos una letra minúscula.",
    },
    {
      reg: /\d/,
      msn: " debe tener por lo menos un carácter numérico.",
    },
    {
      reg: /[^a-zA-Z\d]/,
      msn: " debe tener por lo menos un carácter especial.",
    },
    { reg: /\S/, msn: " no debe tener espacios." },
    {
      reg: /^.{8,30}$/,
      msn: " debe tener entre 8 y 30 caracteres.",
    },
  ];
  const errors =
    isRequired(password, "password") ??
    isString(password, "password") ??
    isNotEmpty(password, "password") ??
    hasValidateRequirements(password, "password", regexArgPassword);
  return errors ?? password;
};

// Validate birthdate.
const validateBirthdate = (
  inputValue: any,
  field: string
) => {
  /*
  Campo obligatorio.
    Tipo Calendario. from ok
    Se debe seleccionar: día, mes, año. frontend ok
    Formato: dd/mm/aaaa ok
    La fecha seleccionada debe ser mayor a 18 años, menor a 99 años.
    Debe ser una fecha válida. ok
  */
  const regexArgDate = [
    {
      reg: /^\d{2}[-/]\d{2}[-/]\d{4}( \d{2}:\d{2}:\d{2})?$/,
      msn: "no es una fecha.",
    },
  ];
  const errors =
    isRequired(inputValue, field) ??
    isNotEmpty(inputValue, field) ??
    isDate(inputValue, field) ??
    isValidateAge(inputValue, field) ??
    hasValidateRequirements(inputValue, field, regexArgDate);
  return errors ?? inputValue;
};

// Validate phone.
const validatePhone = (inputValue: string, field: string): string => {
  /*
  Validación de Teléfono:
    Campo no obligatorio. ok
    Campo de texto. ok
    Mínimo 8 caracteres y 16 máximo .
    Se permite caracteres numéricos, espacios y los caracteres especiales + -
    No se permiten caracteres alfabéticos.
  */
  const regexArgPhone = [
    {
      reg: /^.{8,16}$/,
      msn: "debe tener entre 8 y 16 caracteres.",
    },
    {
      reg: /^[0-9 +-]*$/,
      msn: "solo puede contener caracteres numéricos, espacios y los caracteres especiales + -..",
    },
  ];
  const errors =
    isRequired(inputValue, field) ??
    isNotEmpty(inputValue, field) ??
    isString(inputValue, field) ??
    hasValidateRequirements(inputValue, field, regexArgPhone);
  return errors ?? inputValue;
};

//validate role.
const validateRole = (
  inputValue: number,
  filed: string
): number | string => {
  /*
  validación del rol
    Campo obligatorio.ok
    solo números.ok
    Lista desplegable. frontend ok
    Opciones: Freelancer / Cliente role id=1/2 ok
  */
  const regexArgRole = [
    {
      reg: /^\d+$/,
      msn: "Debe ser un valor numérico.",
    },
  ];
  const errors =
    isRequired(inputValue, filed) ??
    isNumber(inputValue, filed) ??
    isNotEmpty(inputValue, filed) ??
    hasValidateRequirements(inputValue, "role", regexArgRole);
  return errors ?? inputValue;
};
// Validate body fields
export const validateFields = (body: any) => {
  const bodyKey = Object.keys(body);
  if (bodyKey.length === 0) {
    return { message: "No hay campos en el body." };
  }
  // Validar campos contra modelos
  for (const key of bodyKey) {
    if (!userKeys.includes(key)) {
      return {
        message: `El campo ${key} no está definido en el modelo usuario.`,
      };
    }
  }
  return true;
};

// Validate field requerid.
export const validateRequeridFields = (body: any) => {
  const requiredFields = userKeys.filter(
    (key) => User.getAttributes()[key].allowNull === false
  );
  for (const field of requiredFields) {
    if (!body[field]) {
      return { message: `El campo ${field} es requerido.` };
    }
  }
  return true;
};

// Validate Custom Fields requerid.
export const validateRequeridFieldsCustom = (body: any) => {
  const requiredFields = ["email", "password"];
  const extraFields = Object.keys(body).filter(
    (key) => !requiredFields.includes(key)
  );
  if (extraFields.length > 0) {
    if (extraFields.length === 1) {
      return {
        message: `El campo ${extraFields[0]} no es admitido en el inicio de sesión.`,
      };
    } else {
      return {
        message: `Los campos ${extraFields.join(
          ", "
        )} no son admitidos en el inicio de sesión.`,
      };
    }
  }
  const invalidFields: string[] = [];
  for (const field of requiredFields) {
    if (!body[field]) {
      invalidFields.push(field);
    }
  }
  if (invalidFields.length > 0) {
    if (invalidFields.length === 1) {
      return { message: `El campo ${invalidFields[0]} es requerido.` };
    } else {
      return {
        message: `Los campos ${invalidFields.join(", ")} son inválidos.`,
      };
    }
  }
  return true;
};

// Validate Field body
export const validateFieldBody = (body: any) => {
  const isValidateBody:any = {
    avatar: {
      fn: validateAvatar,
    },
    first_name: {
      fn: validateField,
    },
    last_name: {
      fn: validateField,
    },
    email: {
      fn: validateEmail,
    },
    password: {
      fn: validatePassword,
    },
    phone: {
      fn: validatePhone,
    },
    birthdate: {
      fn: validateBirthdate,
    },
    role_id: {
      fn: validateRole,
    },
  };
  let resp:any = {};
  const bodyKeys = Object.keys(body);

  bodyKeys.forEach((key) => {
    const fnName = isValidateBody[key].fn;
    resp[key] = fnName(body[key], key);
  });

  // Comprueba si todos los valores de resp son iguales a los de body
  const allValuesEqual = bodyKeys.every(key => resp[key] === body[key]);

  if (allValuesEqual) {
    return body;
  } else {
    // Filtra las claves de resp que no son iguales a las de body
    const unequalKeys = bodyKeys.filter(key => resp[key] !== body[key]);

    // Crea un nuevo objeto con solo las claves que no son iguales
    const unequalResp:any = {};
    unequalKeys.forEach(key => {
      unequalResp[key] = resp[key];
    });
    return unequalResp;
  }
}
