import { Request, Response, NextFunction } from "express";
import { successResponse } from "../models/responseModel";


// temp memory
const loans: any[] = [];

export const createLoanHandler = (req: Request, res: Response, next: NextFunction) => {
    try {
        const newLoan = { id: loans.length + 1, ...req.body };
        loans.push(newLoan);
        res.status(201).json(successResponse(newLoan, "Loan application created successfully"));
    } catch (error) {
        next(error);
    }
};

export const getLoansHandler = (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json(successResponse(loans, "Loans retrieved successfully"));
    } catch (error) {
        next(error);
    }
};

export const getLoanByIdHandler = (req: Request, res: Response, next: NextFunction) => {
    try {
        const loan = loans.find((l) => l.id === parseInt(req.params.id));
        if (!loan) {
            return res.status(404).json({ success: false, message: "Loan not found" });
        }
        res.status(200).json(successResponse(loan, "Loan retrieved successfully"));
    } catch (error) {
        next(error);
    }
};

export const updateLoanHandler = (req: Request, res: Response, next: NextFunction) => {
    try {
        const index = loans.findIndex((l) => l.id === parseInt(req.params.id));
        if (index === -1) {
            return res.status(404).json({ success: false, message: "Loan not found" });
        }
        loans[index] = { ...loans[index], ...req.body };
        res.status(200).json(successResponse(loans[index], "Loan updated successfully"));
    } catch (error) {
        next(error);
    }
};

export const deleteLoanHandler = (req: Request, res: Response, next: NextFunction) => {
    try {
        const index = loans.findIndex((l) => l.id === parseInt(req.params.id));
        if (index === -1) {
            return res.status(404).json({ success: false, message: "Loan not found" });
        }
        loans.splice(index, 1);
        res.status(200).json(successResponse({}, "Loan deleted successfully"));
    } catch (error) {
        next(error);
    }
};
