import express, { Request, Response } from "express";
import dotenv from "dotenv";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Shop } from "./entity/Shop";

import { logger } from "./middleware/logger";
import radioRepository from "./repository/radioRepository";

dotenv.config();

const port: number = parseInt(process.env.PORT || "80");
const host: string = process.env.HOST || "0.0.0.0";

const AppDataSource = new DataSource({
	type: "mongodb",
	url: process.env.MONGODB_URL,
	database: "LaboExpress",
	entities: [Shop],
	synchronize: true,
	useUnifiedTopology: true,
	useNewUrlParser: true,
});

AppDataSource.initialize()
	.then(async () => {
		console.log("Database connection initialized");
		const shopRepository = AppDataSource.getRepository(Shop);
		//APP Setup

		const app = express();

		app.use(express.json());
		app.use(logger());

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

		app.listen(port, host, () => {
			console.log(`ExpressTS server listening at http://${host}:${port}`);
		});
	})
	.catch((error) => {
		console.log(error);
	});
