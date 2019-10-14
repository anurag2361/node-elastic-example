import express, { Express } from "express";
import router from "./routes/routes";
const port: number = 3001;
const app: Express = express();

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/data", router);

app.listen(port, (err) => {
    if (err) {
        throw err;
    } else {
        console.log(`App running on http://localhost:${port}`);
    }
});
