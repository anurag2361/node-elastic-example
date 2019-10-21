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
const express_1 = require("express");
const request_promise_1 = __importDefault(require("request-promise"));
const eController_1 = require("./../elasticController/eController");
const router = express_1.Router();
router.post("/feedData", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const artist = req.body.artist;
    request_promise_1.default(`https://itunes.apple.com/search?term=${artist}&limit=100000`)
        .then((response) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield JSON.parse(response);
        for (let i = result.results.length - 1; i >= 0; i--) {
            let artistId = result.results[i].artistId;
            let kind = result.results[i].kind;
            let artistName = result.results[i].artistName;
            let trackName = result.results[i].trackName;
            let collectionName = result.results[i].collectionName;
            let collectionCensoredName = result.results[i].collectionCensoredName;
            let artistViewUrl = result.results[i].artistViewUrl;
            let collectionViewUrl = result.results[i].collectionViewUrl;
            let trackViewUrl = result.results[i].trackViewUrl;
            let previewUrl = result.results[i].previewUrl;
            let artworkUrl100 = result.results[i].artworkUrl100;
            let collectionPrice = result.results[i].collectionPrice;
            let releaseDate = result.results[i].releaseDate;
            let collectionExplicitness = result.results[i].collectionExplicitness;
            let trackExplicitness = result.results[i].trackExplicitness;
            let discCount = result.results[i].discCount;
            let discNumber = result.results[i].discNumber;
            let trackCount = result.results[i].trackCount;
            let trackNumber = result.results[i].trackNumber;
            let country = result.results[i].country;
            let currency = result.results[i].currency;
            yield eController_1.ElasticFunctions.prototype.feed(artistId, trackName, kind, artistName, collectionName, collectionCensoredName, artistViewUrl, collectionViewUrl, trackViewUrl, previewUrl, artworkUrl100, collectionPrice, releaseDate, collectionExplicitness, trackExplicitness, discCount, discNumber, trackCount, trackNumber, country, currency);
        }
        res.send("Done");
    })).catch((error) => {
        throw error;
    });
}));
router.post("/getData", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const artistName = req.body.artistName;
    const trackName = req.body.trackName;
    let value = (artistName === undefined || artistName === null) ? trackName : artistName;
    console.log(value);
    const result = yield eController_1.ElasticFunctions.prototype.fetch(value);
    res.send(result);
}));
exports.default = router;
//# sourceMappingURL=routes.js.map