import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

const port: number = parseInt(process.env.PORT || "80");
const host: string = process.env.HOST || "0.0.0.0";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
	res.send("Hello World!");
});

app.listen(port, host, () => {
	console.log(`ExpressTS server listening at http://${host}:${port}`);
});
