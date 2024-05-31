import { Request, Response } from "express";
import { Label } from "../models/labels.model";

export class LabelsController {
    static async createLabel(req: Request, res: Response) {
        try {
            const { description, color, name } = req.body;

            const newLabel = await Label.create({ description, color, name });

            res.status(201).json(newLabel);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    static async getLabels(_req: Request, res: Response) {
        try {
            const labels = await Label.findAll();

            res.status(200).json(labels);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    static async getLabelById(req: Request, res: Response) {
        try {
            const { id } = req.params;

            if (!id) {
                return res
                    .status(400)
                    .json({ message: "Label ID is required" });
            }

            const label = await Label.findByPk(id);

            if (!label) {
                return res.status(404).json({ message: "Label not found" });
            }
            return res.status(200).json(label);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    static async updateLabel(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { description, color, name } = req.body;

            if (!id) {
                return res
                    .status(400)
                    .json({ message: "Label ID is required" });
            }

            const updatedRole = await Label.update(
                { description, color, name },
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

    static async deleteLabel(req: Request, res: Response) {
        try {
            const { id } = req.params;

            if (!id) {
                return res
                    .status(400)
                    .json({ message: "Label ID is required" });
            }

            const deletedRole = await Label.destroy({ where: { id } });

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
