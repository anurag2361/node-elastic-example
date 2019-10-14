import { Request, Response, Router } from "express";
import { ElasticFunctions } from "./../elasticController/eController";
const router = Router();

router.post("/feedData", async (req: Request, res: Response) => {
    const index: string = req.body.index;
    const company: string = req.body.company;
    const address: string = req.body.address;

    const result = await ElasticFunctions.prototype.feed(index, company, address);
    res.send(result);
});

router.get("/getData", async (req: Request, res: Response) => {
    const index: string = req.body.index;
    const value: string = req.body.value;
    const result = await ElasticFunctions.prototype.fetch(index, value);
    res.send(result);
});

export default router;
