import { client } from "./../elasticController/eController";

export class ElasticBootstrap {
    public async createIndex() {
        try {
            const result = await client.indices.exists({ index: "artist" });
            if (result.body === true) {
                console.log("index exists");
                return;
            } else {
                const index = await client.indices.create(
                    {
                        index: "artist",
                        body: {
                            "settings": {
                                "analysis": {
                                    "analyzer": {
                                        "my_analyzer": {
                                            "tokenizer": "my_tokenizer",
                                        },
                                    },
                                    "tokenizer": {
                                        "my_tokenizer": {
                                            "type": "ngram",
                                            "min_gram": 3,
                                            "max_gram": 3,
                                            "token_chars": [
                                                "letter",
                                                "digit",
                                            ],
                                        },
                                    },
                                },
                            },
                            "mappings": {
                                "properties": {
                                    "artistId": {
                                        "type": "integer"
                                    },
                                    "artistName": {
                                        "type": "text",
                                        "analyzer": "my_analyzer",
                                    },
                                    "artistViewUrl": {
                                        "type": "text"
                                    },
                                    "artworkUrl100": {
                                        "type": "text"
                                    },
                                    "collectionCensoredName": {
                                        "type": "text",
                                        "analyzer": "my_analyzer",
                                    },
                                    "collectionExplicitness": {
                                        "type": "text"
                                    },
                                    "collectionName": {
                                        "type": "text",
                                        "analyzer": "my_analyzer",
                                    },
                                    "collectionPrice": {
                                        "type": "float"
                                    },
                                    "collectionViewUrl": {
                                        "type": "text"
                                    },
                                    "country": {
                                        "type": "text"
                                    },
                                    "currency": {
                                        "type": "text"
                                    },
                                    "discCount": {
                                        "type": "long"
                                    },
                                    "discNumber": {
                                        "type": "long"
                                    },
                                    "kind": {
                                        "type": "text"
                                    },
                                    "previewUrl": {
                                        "type": "text"
                                    },
                                    "releaseDate": {
                                        "type": "date"
                                    },
                                    "trackCount": {
                                        "type": "long"
                                    },
                                    "trackExplicitness": {
                                        "type": "text"
                                    },
                                    "trackName": {
                                        "type": "text",
                                        "analyzer": "my_analyzer"
                                    },
                                    "trackNumber": {
                                        "type": "long"
                                    },
                                    "trackViewUrl": {
                                        "type": "text"
                                    }
                                }
                            }
                        },
                    },
                );
                console.log("index created>>>>>>>>>>>>>>>>", index);
                return;
            }
        } catch (error) {
            return Promise.reject(`Error in creating index. Error: ${error}`);
        }
    }
}
