import express from "express";
import {
    createLoanHandler,
    getLoansHandler,
    getLoanByIdHandler,
    updateLoanHandler,
    deleteLoanHandler,
} from "../controllers/loanController";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const router: express.Router = express.Router();

router.post(
    "/loans",
    authenticate,
    isAuthorized({ hasRole: ["admin", "manager"] }),
    createLoanHandler
);

router.get("/loans",
    isAuthorized({ hasRole: ["admin", "manager"] }), 
    authenticate, getLoansHandler);

router.get("/loans/:id", 
    isAuthorized({ hasRole: ["admin", "manager"] }),
    authenticate, getLoanByIdHandler);

router.put(
    "/loans/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin", "manager"], allowSameUser: true }),
    updateLoanHandler
);

router.delete(
    "/loans/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin", "manager"] }),
    deleteLoanHandler
);

export default router;
