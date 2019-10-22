"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cluster_1 = __importDefault(require("cluster"));
const express_1 = __importDefault(require("express"));
const os_1 = __importDefault(require("os"));
const routes_1 = __importDefault(require("./routes/routes"));
const numCPUs = os_1.default.cpus().length;
const port = 3001;
const app = express_1.default();
app.use(express_1.default.json({ limit: "1mb" }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/data", routes_1.default);
if (cluster_1.default.isMaster) {
    for (let i = 0; i < numCPUs; i++) {
        cluster_1.default.fork();
    }
    cluster_1.default.on("exit", (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
}
else {
    app.listen(port, (err) => {
        if (err) {
            throw err;
        }
        else {
            console.log(`App running on http://localhost:${port}`);
        }
    });
}
//# sourceMappingURL=index.js.map