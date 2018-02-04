// import * as compression from 'compression';
import * as bodyParser from "body-parser";
import * as express from "express";
import * as mongoose from "mongoose";
import * as logger from "morgan";

// Server class
class Server {
    public app: express.Application;
    constructor() {
        this.app = express();
        this.config();
        this.middleware();
        this.routes();
    }
    public config() {
        // setup mongoose
        const MONGO_URI = "mongodb://localhost/myIoT-db";
        mongoose.connect(MONGO_URI || process.env.MONGODB_URI, (err) => {
            if (err) {
                throw err;
            }
            console.log("Successfully connected to mongodb");
        });
    }
    public routes(): void {
        const router: express.Router = express.Router();
        router.get("/", (req, res, next) => {
            res.json({
                message: "Hello World!"
            });
        });
        this.app.use("/", router);
    }
    private middleware() {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(logger("dev"));
    }
}
export default new Server().app;
