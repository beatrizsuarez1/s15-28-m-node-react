import { Request, Response } from "express";
import { Role } from "../models/roles.model";

export class RolesController {
    static async createRoles(req: Request, res: Response) {
        try {
            const { role } = req.body;

            if (!role) {
                return res
                    .status(400)
                    .json({ message: "Role name is required" });
            }

            const newRole = await Role.create({ role });

            res.status(201).json(newRole);
        } catch (error) {
            console.error("Error creating project:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    static async getRoles(_req: Request, res: Response) {
        try {
            const roles = await Role.findAll();

            res.status(200).json(roles);
        } catch (error) {
            console.error("Error creating project:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    static async getRoleById(req: Request, res: Response) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ message: "Role ID is required" });
            }

            const role = await Role.findByPk(id);

            if (!role) {
                return res.status(404).json({ message: "Role not found" });
            }
            return res.status(200).json(role);
        } catch (error) {
            console.error("Error creating project:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    static async updateRole(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { role } = req.body;

            if (!id) {
                return res.status(400).json({ message: "Role ID is required" });
            }

            if (!role) {
                return res
                    .status(400)
                    .json({ message: "Role name is required" });
            }

            const updatedRole = await Role.update(
                { role },
                { where: { id }, returning: true }
            );

            if (updatedRole[0] === 1)
                return res.status(200).json({
                    message: "Updated role",
                    data: updatedRole[1][0],
                });

            return res
                .status(400)
                .json({ message: "Role could not be updated" });
        } catch (error) {
            console.error("Error creating project:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    static async deleteRole(req: Request, res: Response) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ message: "Role ID is required" });
            }

            const deletedRole = await Role.destroy({ where: { id } });

            if (deletedRole === 1)
                return res.status(200).json({ message: "Deleted role" });

            return res
                .status(400)
                .json({ message: "Role could not be deleted" });
        } catch (error) {
            console.error("Error creating project:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}
