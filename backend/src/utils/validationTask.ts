import { Task } from "../models/tasks.model";

const taskKey = Object.keys(Task.getAttributes());

export const validateFieldsTask = (body: any) => {
  const bodyKey = Object.keys(body);
  // No este vació el Cuerpo de la petición
  if (bodyKey.length === 0) {
    return { message: "No hay campos en el body." };
  }
  // Validar campos contra modelos
  for (const key of bodyKey) {
    if (!taskKey.includes(key)) {
      return {
        message: `El campo ${key} no está definido en el modelo usuario.`,
      };
    }
  }
  return true;
};

export const validateRequeridFieldsTask = (body: any) => {
  const requiredFields = taskKey.filter(
    (key) => Task.getAttributes()[key].allowNull === false
  )
  for (const field of requiredFields) {
    if (!body[field]) {
      return { message: `El campo ${field} es requerido.` }
    }
  }
  return true
}
