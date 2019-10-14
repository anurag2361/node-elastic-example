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
const elasticsearch_1 = require("@elastic/elasticsearch");
const slug_1 = __importDefault(require("slug"));
const client = new elasticsearch_1.Client({ node: "http://localhost:9200" });
class ElasticFunctions {
    constructor() { }
    feed(indexdata, company, address) {
        return __awaiter(this, void 0, void 0, function* () {
            const indexData = slug_1.default(indexdata);
            const feedData = yield client.index({
                index: indexData,
                body: {
                    address,
                    company,
                },
            });
            return feedData;
        });
    }
    fetch(index, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const index1 = slug_1.default(index);
            const searchResult = {
                index: index1,
                body: {
                    query: {
                        match: {
                            address: value,
                        },
                    },
                },
            };
            const response = yield client.search(searchResult);
            console.log(response.body);
            return response.body;
        });
    }
}
exports.ElasticFunctions = ElasticFunctions;
//# sourceMappingURL=eController.js.map