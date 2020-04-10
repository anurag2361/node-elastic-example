import cluster from "cluster";
import express, { Express } from "express";
import os from "os";
import { ElasticBootstrap } from "./ESBootstrap/es";
import router from "./routes/routes";

const numCPUs: number = os.cpus().length;
const port: number = 3001;
const app: Express = express();

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/data", router);

if (cluster.isMaster) {
    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on("exit", (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {
    const server: any = app.listen(port, "localhost", async (err) => {
        if (err) {
            throw err;
        } else {
            const host = server.address().address;
            console.log("Example app listening at http://%s:%s", host, port);
            await ElasticBootstrap.prototype.createIndex();
            // await ElasticBootstrap.prototype.createMapping();
        }
    });
}
