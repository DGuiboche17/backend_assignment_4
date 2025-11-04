import express from "express";
import { validateRequest } from "../middleware/validate";
import { itemSchema } from "../validations/itemValidation";
import {
    getAllItems,
    createItem,
    updateItem,
    deleteItem,
    getItemById,
} from "../controllers/itemController";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const router: express.Router = express.Router();

router.post(
    "/items",
    authenticate,
    isAuthorized({ hasRole: ["admin", "manager"] }),
    validateRequest(itemSchema),
    createItem
);

router.get("/items", authenticate, getAllItems);

router.get("/items/:id", authenticate, getItemById);

router.put(
    "/items/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin", "manager"], allowSameUser: true }),
    validateRequest(itemSchema),
    updateItem
);

router.delete(
    "/items/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin", "manager"] }),
    deleteItem
);

export default router;
