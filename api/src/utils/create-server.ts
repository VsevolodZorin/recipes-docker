import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from '../routes';

export function createServer() {
	const app = express();

	app.use(bodyParser.json());
	app.use(cors());

	app.use(routes);

	return app;
}
