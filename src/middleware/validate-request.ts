import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

export const validateRequest = (schema: ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            res.status(400).json({
                message: "Validation failed",
                errors: error.details.map((err) => err.message),
            });
            return;
        }

        next();
    };
};

export default validateRequest; // ✅ Fix: Ensure the file is recognized as a module.
