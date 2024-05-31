import { Router } from "express";
import { RolesController } from "../controllers/roles.controller";

const router = Router();

router.post("/", RolesController.createRoles);
router.get("/", RolesController.getRoles);
router.get("/:id", RolesController.getRoleById);
router.patch("/:id", RolesController.updateRole);
router.delete("/:id", RolesController.deleteRole);

export { router };
