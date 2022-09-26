import express, { Request, Response } from "express";
import dotenv from "dotenv";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Shop } from "./entity/Shop";

import { logger } from "./middleware/logger";

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

		app.listen(port, host, () => {
			console.log(`ExpressTS server listening at http://${host}:${port}`);
		});
	})
	.catch((error) => {
		console.log(error);
	});
