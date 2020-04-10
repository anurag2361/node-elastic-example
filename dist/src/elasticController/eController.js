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
const elasticsearch_1 = require("@elastic/elasticsearch");
exports.client = new elasticsearch_1.Client({ node: "http://localhost:9200" });
class ElasticFunctions {
    feed(artistId, trackName, kind, artistName, collectionName, collectionCensoredName, artistViewUrl, collectionViewUrl, trackViewUrl, previewUrl, artworkUrl100, collectionPrice, releaseDate, collectionExplicitness, trackExplicitness, discCount, discNumber, trackCount, trackNumber, country, currency) {
        return __awaiter(this, void 0, void 0, function* () {
            yield exports.client.index({
                index: "artist",
                type: "_doc",
                body: {
                    "kind": kind,
                    "artistId": artistId,
                    "artistName": artistName,
                    "trackName": trackName,
                    "collectionName": collectionName,
                    "collectionCensoredName": collectionCensoredName,
                    "artistViewUrl": artistViewUrl,
                    "collectionViewUrl": collectionViewUrl,
                    "trackViewUrl": trackViewUrl,
                    "previewUrl": previewUrl,
                    "artworkUrl100": artworkUrl100,
                    "collectionPrice": collectionPrice,
                    "releaseDate": releaseDate,
                    "collectionExplicitness": collectionExplicitness,
                    "trackExplicitness": trackExplicitness,
                    "discCount": discCount,
                    "discNumber": discNumber,
                    "trackCount": trackCount,
                    "trackNumber": trackNumber,
                    "country": country,
                    "currency": currency,
                },
            }).then((value) => __awaiter(this, void 0, void 0, function* () {
                return "done";
            })).catch((error) => {
                return Promise.reject(`Error in storing data. Error: ${error}`);
            });
        });
    }
    fetch(value, numFrom) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryString = {
                    "query": {
                        "multi_match": {
                            "query": String(value),
                            "fields": ["artistName", "collectionCensoredName", "collectionName", "trackName"]
                        }
                    }
                };
                console.log(queryString);
                const searchResult = {
                    index: "artist",
                    type: "_doc",
                    body: queryString,
                };
                const response = yield exports.client.search(searchResult);
                return response.body;
            }
            catch (err) {
                throw new Error(`ElasticSearch error: ${err}`);
            }
        });
    }
}
exports.ElasticFunctions = ElasticFunctions;
//# sourceMappingURL=eController.js.map