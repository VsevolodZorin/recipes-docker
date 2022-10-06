import { config } from './config';
import appManager from './utils/app-manager';

const startServer = () => {
	appManager.app.listen(config.app.httpPort, () => {
		console.log(`Started api service on port ${config.app.httpPort}`);
	});
};

const run = async () => {
	const connection = await appManager.connectToDb();
	connection
		.on('error', console.log)
		.on('disconnected', async () => await appManager.connectToDb());

	startServer();
};

run();
