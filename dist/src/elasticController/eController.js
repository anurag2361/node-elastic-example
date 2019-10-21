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
const client = new elasticsearch_1.Client({ node: "http://localhost:9200" });
class ElasticFunctions {
    constructor() { }
    feed(artistId, trackName, kind, artistName, collectionName, collectionCensoredName, artistViewUrl, collectionViewUrl, trackViewUrl, previewUrl, artworkUrl100, collectionPrice, releaseDate, collectionExplicitness, trackExplicitness, discCount, discNumber, trackCount, trackNumber, country, currency) {
        return __awaiter(this, void 0, void 0, function* () {
            yield client.index({
                index: "artist",
                body: {
                    kind,
                    artistId,
                    artistName,
                    trackName,
                    collectionName,
                    collectionCensoredName,
                    artistViewUrl,
                    collectionViewUrl,
                    trackViewUrl,
                    previewUrl,
                    artworkUrl100,
                    collectionPrice,
                    releaseDate,
                    collectionExplicitness,
                    trackExplicitness,
                    discCount,
                    discNumber,
                    trackCount,
                    trackNumber,
                    country,
                    currency,
                },
            }).then((value) => {
                return "done";
            }).catch((error) => {
                throw error;
            });
        });
    }
    fetch(value) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchResult = {
                index: "artist",
                body: {
                    query: {
                        bool: {
                            should: [
                                { match: { artistName: value } },
                                { match: { trackName: value } },
                            ],
                        },
                    },
                },
            };
            const response = yield client.search(searchResult);
            return response.body;
        });
    }
}
exports.ElasticFunctions = ElasticFunctions;
//# sourceMappingURL=eController.js.map