import mongoose, { ConnectOptions } from 'mongoose';
import { config } from '../config';

export const connectDb = new Promise<mongoose.Connection>((resolve, reject) => {
  mongoose.connect(config.db.mongoUrl, {
    useNewUrlParser: true,
  } as ConnectOptions);
  resolve(mongoose.connection);
});
