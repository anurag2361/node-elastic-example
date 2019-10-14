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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const eController_1 = require("./../elasticController/eController");
const router = express_1.Router();
router.post("/feedData", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const index = req.body.index;
    const company = req.body.company;
    const address = req.body.address;
    const result = yield eController_1.ElasticFunctions.prototype.feed(index, company, address);
    res.send(result);
}));
router.get("/getData", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const index = req.body.index;
    const value = req.body.value;
    const result = yield eController_1.ElasticFunctions.prototype.fetch(index, value);
    res.send(result);
}));
exports.default = router;
//# sourceMappingURL=routes.js.map