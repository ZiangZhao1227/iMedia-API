import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

const unknownEndpoint = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    status: 404,
    message: "Page Not Found",
  });
  next();
};

const generalError: ErrorRequestHandler = (err, req, res, next) => {
  res.status(err.status || 500).json({
    status: err.status || 500,
    message: err.message || "Internal Server Error",
  });
};

export default {
  unknownEndpoint,
  generalError,
};