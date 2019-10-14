"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes/routes"));
const port = 3001;
const app = express_1.default();
app.use(express_1.default.json({ limit: "1mb" }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/data", routes_1.default);
app.listen(port, (err) => {
    if (err) {
        throw err;
    }
    else {
        console.log(`App running on http://localhost:${port}`);
    }
});
//# sourceMappingURL=index.js.map