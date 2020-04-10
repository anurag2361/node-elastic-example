"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cluster_1 = __importDefault(require("cluster"));
const express_1 = __importDefault(require("express"));
const os_1 = __importDefault(require("os"));
const es_1 = require("./ESBootstrap/es");
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
    const server = app.listen(port, "localhost", (err) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            throw err;
        }
        else {
            const host = server.address().address;
            console.log("Example app listening at http://%s:%s", host, port);
            yield es_1.ElasticBootstrap.prototype.createIndex();
        }
    }));
}
//# sourceMappingURL=index.js.map