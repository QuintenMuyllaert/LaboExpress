import { Request, Response, NextFunction } from "express";

export const logger = () => {
	const middleware = (req: Request, res: Response, next: NextFunction) => {
		const time = new Date().toISOString();
		const obj = {
			time: time,
			method: req.method,
			url: req.url,
			body: req.body,
			query: req.query,
		};

		console.log("Logger: ", obj);

		res.setHeader("Time", time);

		next();
	};

	return middleware;
};
