import { Request, Response } from "express";
import { Stopwatch } from "../models/stopwatch.model";
import {
  validateFieldBody,
  validateFields,
  validateRequeridFields,
} from "../utils/validationTimer";

export async function createTimer(req: Request, res: Response) {
  try {
    const body = req.body;
    const validateBodyInModel = validateFields(body);
    if (validateBodyInModel !== true)
      return res.status(400).json(validateBodyInModel);
    const validateRequeridBody = validateRequeridFields(body);
    if (validateRequeridBody !== true)
      return res.status(400).json(validateRequeridBody);
    const bodyValidate = validateFieldBody(body);
    const bodyValidateKeys = Object.keys(bodyValidate);
    const validate: boolean = bodyValidateKeys.every(
      (key: string) => bodyValidate[key] === body[key]
    );
    if (!validate) return res.status(400).json({ message: bodyValidate });
    const newTimer = await Stopwatch.create(body);
    res.status(201).json({
      message: "El cronometro ha sido creado con éxito.",
      data: newTimer,
    });
  } catch (error) {
    return res.status(500).json({
      message:
        "La creación del cronometro tiene un error interno en el servidor",
    });
  }
}

export async function getTimers(_req: Request, res: Response) {
  try {
    const timers = await Stopwatch.findAll();
    res.status(200).json({
      message: "La lista de cronómetros ha sido realizad con éxito.",
      data: timers
    });
  } catch (error) {
    return res.status(500).json({
      message: "El listado de cronometro tiene un error interno en el servidor",
    });
  }
}

export async function getTimerById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "El id es requerido." });
    const timer = await Stopwatch.findByPk(id);
    if (!timer) {
      return res.status(404).json({ message: "El cronometro no existe" });
    }
    return res.status(200).json({
      message: "El cronometro fue encontrado con éxito.",
      data: timer
    });
  } catch (error) {
    return res.status(500).json({
      message:
        "La búsqueda de cronometro por id tiene un error interno en el servidor",
    });
  }
}

export async function updateTimer(req: Request, res: Response) {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({ message: "El id es requerido." });
    const body = req.body;
    const validateBodyInModel = validateFields(body);
    if (validateBodyInModel !== true)
      return res.status(400).json(validateBodyInModel);
    const validateRequeridBody = validateRequeridFields(body);
    if (validateRequeridBody !== true)
      return res.status(400).json(validateRequeridBody);
    const bodyValidate = validateFieldBody(body);
    const bodyValidateKeys = Object.keys(bodyValidate);
    const validate: boolean = bodyValidateKeys.every(
      (key: string) => bodyValidate[key] === body[key]
    );
    if (!validate) return res.status(400).json({ message: bodyValidate });
    const [updated] = await Stopwatch.update(body, {
      where: { uuid: id },
    });
    if (updated) {
      const updatedUser = await Stopwatch.findByPk(id);
      if (updatedUser == null) {
        return res
          .status(404)
          .json({ message: "El cronometro no se pudo actualizar." });
      }
      return res.status(200).json({
        message: "El cronometro ha sido actualizado con éxito.",
        data: updatedUser
      });
    }
    return res
      .status(404)
      .json({ message: "El cronometro no se pudo actualizar." });
  } catch (error) {
    return res.status(500).json({
      message:
        "La actualización del cronometro tiene un error interno del Servidor.",
    });
  }
}

export async function deleteTimer(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "El id es requerido." });
    const deletedRole = await Stopwatch.destroy({ where: { id } });
    if (deletedRole === 1)
      return res.status(200).json({ message: "El cronometro fue eliminado con éxito." });
    return res
      .status(400)
      .json({ message: "El cronometro no se pudo eliminar" });
  } catch (error) {
    console.error("Error creating project:", error);
    return res.status(500).json({
      message:
        "La eliminación del cronometro tiene un error interno en el servidor",
    });
  }
}
