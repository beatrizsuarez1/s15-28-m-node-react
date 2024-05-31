import { Router } from "express";
import { LabelsController } from "../controllers/labels.controller";

const router = Router();

router.post("/", LabelsController.createLabel);
router.get("/", LabelsController.getLabels);
router.get("/:id", LabelsController.getLabelById);
router.patch("/:id", LabelsController.updateLabel);
router.delete("/:id", LabelsController.deleteLabel);

export { router };
