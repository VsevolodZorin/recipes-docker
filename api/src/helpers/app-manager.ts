import { Express } from 'express';
import mongoose from 'mongoose';
import { connectDb } from './db';
import http from 'http';
import { createServer } from './create-server';

class AppManager {
  constructor() {
    this._app = createServer();
    this._httpServer = http.createServer(this.app);
  }
  private _app: Express;
  private _httpServer: http.Server;
  private _connection: mongoose.Connection;

  async connectToDb(): Promise<mongoose.Connection> {
    this.connection = await connectDb;
    return this.connection;
  }
  async disconnectDb() {
    await this.connection.close();
  }

  startServerForTests(): void {
    this.connectToDb().then(() => {
      if (!this.httpServer.listening) {
        this.httpServer.listen();
      }
    });
  }

  closeServerForTests(): void {
    // todo: testEnv => remove created enti
    this.disconnectDb().then(() => this.httpServer.close());
  }

  public get app(): Express {
    return this._app;
  }
  private set app(value: Express) {
    this._app = value;
  }

  public get httpServer(): http.Server {
    return this._httpServer;
  }
  private set httpServer(value: http.Server) {
    this._httpServer = value;
  }

  public get connection(): mongoose.Connection {
    return this._connection;
  }
  private set connection(value: mongoose.Connection) {
    this._connection = value;
  }
}

const appManager = new AppManager();

export default appManager;