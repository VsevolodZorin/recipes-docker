import * as express from 'express';
import categoryRouter from './category.route';
import postRouter from './post.route';
import recipeRouter from './recipe.route';

const routes = express.Router();

routes.use('/category', categoryRouter);
routes.use('/recipe', recipeRouter);
routes.use('/post', postRouter);
routes.use('/', (req: express.Request, res: express.Response) => {
	res.status(200).json({ msg: 'from api' });
});

export default routes;
