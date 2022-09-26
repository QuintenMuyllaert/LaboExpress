import { Application, Request, Response } from "express";

import radioRepository from "../repository/radioRepository";

export const attachRoutes = (app: Application) => {
	// Add routes here
	app.get("/radio", (req: Request, res: Response) => {
		res.send(radioRepository.getAll());
	});

	app.post("/radiostation", (req: Request, res: Response) => {
		const { naam } = req.body;
		if (!naam) {
			res.status(400).send("Geen naam opgegeven");
			return;
		}

		const id = radioRepository.add({ naam });
		res.status(201).send({ id });
	});

	app.get("/radiostation", (req: Request, res: Response) => {
		const id = req?.query?.id as unknown as string;
		if (!id) {
			res.status(400).send("Missing id");
			return;
		}

		const radiostation = radioRepository.getById(parseInt(id));
		if (!radiostation) {
			res.status(404).send("Not found");
			return;
		}

		res.send(radiostation);
	});

	app.delete("/radiostation", (req: Request, res: Response) => {
		const id = req?.query?.id as unknown as string;
		if (!id) {
			res.status(400).send("Missing id");
			return;
		}

		radioRepository.delete(parseInt(id));
		res.status(204).send();
	});
};
