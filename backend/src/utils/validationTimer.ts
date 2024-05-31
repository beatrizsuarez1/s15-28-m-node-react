import { Stopwatch } from "../models/stopwatch.model";

// Validate field Requirements.
const isRequired = (inputValue: any, field: string): string | null => {
  return !inputValue ? `El ${field} es requerido.` : null;
};

// Validate field date.
const isDate = (inputValue: any, field: string): string | null => {
  return Number.isNaN(Date.parse(inputValue))
    ? `El ${field} no es una fecha válida.`
    : null;
};

const isTime = (inputValue: any, field:string): string | null =>  {
  return (inputValue instanceof Date && !Number.isNaN(inputValue.getTime()))
    ? `El ${field} no es un tiempo válido.`
    : null;
}

//validate field not empty.
const isNotEmpty = (inputValue: any, field: string): string | null => {
  return inputValue.length === 0 ? `El ${field} no puede estar vacío.` : null;
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

// User models  keys
const timerKeys = Object.keys(Stopwatch.getAttributes());

// Validate init_date.
const validateInitDate = (inputValue: any, field: string) => {
  /*
  Campo obligatorio.
    Tipo Calendario. from ok
    Se debe seleccionar: día, mes, año. frontend ok
    Formato: dd/mm/aaaa ok
    La fecha seleccionada debe ser mayor a 18 años, menor a 99 años.
    Debe ser una fecha válida. ok
  */
  const regexArgInitDate = [
    {
      reg: /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{2}$/,
      msn: "no es valida.",
    },
  ];
  const errors =
    isRequired(inputValue, field) ??
    isNotEmpty(inputValue, field) ??
    isDate(inputValue, field) ??
    hasValidateRequirements(inputValue, field, regexArgInitDate);
  return errors ?? inputValue;
};
// Validate end_date.
const validateEndDate = (inputValue: any, field: string) => {
  /*
  Campo obligatorio.
    Tipo Calendario. from ok
    Se debe seleccionar: día, mes, año. frontend ok
    Formato: dd/mm/aaaa ok
    La fecha seleccionada debe ser mayor a 18 años, menor a 99 años.
    Debe ser una fecha válida. ok
  */
  const regexArgEndDate = [
    {
      reg: /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{2}$/,
      msn: "no es valida.",
    },
  ];
  const errors =
    isRequired(inputValue, field) ??
    isNotEmpty(inputValue, field) ??
    isDate(inputValue, field) ??
    hasValidateRequirements(inputValue, field, regexArgEndDate);
  return errors ?? inputValue;
};
// Validate total_date.
const validateTotalDate = (inputValue: any, field: string) => {
  /*
  Campo obligatorio.
    Tipo Calendario. from ok
    Se debe seleccionar: día, mes, año. frontend ok
    Formato: dd/mm/aaaa ok
    La fecha seleccionada debe ser mayor a 18 años, menor a 99 años.
    Debe ser una fecha válida. ok
  */
  const regexArgTotalDate = [
    {
      reg:  /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(\.\d{1,2})?$/,
      msn: "no es valido.",
    },
  ];
  const errors =
    isRequired(inputValue, field) ??
    isNotEmpty(inputValue, field) ??
    isTime(inputValue, field) ??
    hasValidateRequirements(inputValue, field, regexArgTotalDate);
  return errors ?? inputValue;
};

//validate role.
const validateTask = (
  inputValue: number,
  field: string
): number | string => {
  /*
  validación del rol
    Campo obligatorio.ok
    solo números.ok
    Lista desplegable. frontend ok
    Opciones: Freelancer / Cliente role id=1/2 ok
  */
  const regexArgTask = [
    {
      reg: /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/,
      msn: "Debe ser un uuid.",
    },
  ];
  const errors =
    isRequired(inputValue, field) ??
    isNotEmpty(inputValue, field) ??
    hasValidateRequirements(inputValue, field, regexArgTask);
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
    if (!timerKeys.includes(key)) {
      return {
        message: `El campo ${key} no está definido en el modelo cronometro.`,
      };
    }
  }
  return true;
};

// Validate field requerid.
export const validateRequeridFields = (body: any) => {
  const requiredFields = timerKeys.filter(
    (key) => Stopwatch.getAttributes()[key].allowNull === false
  );
  for (const field of requiredFields) {
    if (!body[field]) {
      return { message: `El campo ${field} es requerido.` };
    }
  }
  return true;
};

// Validate Field body
export const validateFieldBody = (body: any) =>  {
  const isValidateBody: any = {
    init_date: {
      fn: validateInitDate,
    },
    end_date: {
      fn: validateEndDate,
    },
    total_date: {
      fn: validateTotalDate,
    },
    task_id: {
      fn: validateTask,
    },
  };
  let resp: any = {};
  const bodyKeys = Object.keys(body);
  bodyKeys.forEach((key) => {
    const fnName = isValidateBody[key].fn;
    resp[key] = fnName(body[key], key);
  });
  // Comprueba si todos los valores de resp son iguales a los de body
  const allValuesEqual = bodyKeys.every((key) => resp[key] === body[key]);
  if (allValuesEqual) {
    return body;
  } else {
    // Filtra las claves de resp que no son iguales a las de body
    const unequalKeys = bodyKeys.filter((key) => resp[key] !== body[key]);
    // Crea un nuevo objeto con solo las claves que no son iguales
    const unequalResp: any = {};
    unequalKeys.forEach((key) => {
      unequalResp[key] = resp[key];
    });
    return unequalResp;
  }
};
