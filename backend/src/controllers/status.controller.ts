import { Request, Response } from "express";
import { Status } from "../models/status.model";

export class StatusesController {
    static async createStatus(req: Request, res: Response) {
        try {
            const { color, name } = req.body;

            const newLabel = await Status.create({ color, name });

            res.status(201).json(newLabel);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    static async getStatuses(_req: Request, res: Response) {
        try {
            const labels = await Status.findAll();

            res.status(200).json(labels);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    static async getStatusById(req: Request, res: Response) {
        try {
            const { id } = req.params;

            if (!id) {
                return res
                    .status(400)
                    .json({ message: "Label ID is required" });
            }

            const label = await Status.findByPk(id);

            if (!label) {
                return res.status(404).json({ message: "Label not found" });
            }
            return res.status(200).json(label);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    static async updateStatus(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { color, name } = req.body;

            if (!id) {
                return res
                    .status(400)
                    .json({ message: "Label ID is required" });
            }

            const updatedRole = await Status.update(
                { color, name },
                { where: { id }, returning: true }
            );

            if (updatedRole[0] === 1)
                return res.status(200).json({
                    message: "Updated label",
                    data: updatedRole[1][0],
                });

            return res
                .status(400)
                .json({ message: "Label could not be updated" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    static async deleteStatus(req: Request, res: Response) {
        try {
            const { id } = req.params;

            if (!id) {
                return res
                    .status(400)
                    .json({ message: "Label ID is required" });
            }

            const deletedRole = await Status.destroy({ where: { id } });

            if (deletedRole === 1)
                return res.status(200).json({ message: "Deleted label" });

            return res
                .status(400)
                .json({ message: "Label could not be deleted" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}
