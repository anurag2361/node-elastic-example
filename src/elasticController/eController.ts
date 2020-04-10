import { ApiResponse, Client, RequestParams } from "@elastic/elasticsearch";
export const client = new Client({ node: "http://localhost:9200" });

interface ISearchBody {
    query: object;
}

interface ISource {
    foo: string;
}

interface IShardsResponse {
    total: number;
    successful: number;
    failed: number;
    skipped: number;
}

interface IExplanation {
    value: number;
    description: string;
    details: IExplanation[];
}

interface ISearchResponse<T> {
    took: number;
    timed_out: boolean;
    _scroll_id?: string;
    _shards: IShardsResponse;
    hits: {
        total: number;
        max_score: number;
        hits: Array<{
            _index: string;
            _type: string;
            _id: string;
            _score: number;
            _source: T;
            _version?: number;
            _explanation?: IExplanation;
            fields?: any;
            highlight?: any;
            inner_hits?: any;
            matched_queries?: string[];
            sort?: string[];
        }>;
    };
    aggregations?: any;
}

export class ElasticFunctions {
    public async feed(artistId, trackName, kind, artistName: string, collectionName, collectionCensoredName, artistViewUrl, collectionViewUrl, trackViewUrl, previewUrl, artworkUrl100, collectionPrice, releaseDate, collectionExplicitness, trackExplicitness, discCount, discNumber, trackCount, trackNumber, country, currency) {
        await client.index({
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
        }).then(async (value) => {
            return "done";
        }).catch((error) => {
            return Promise.reject(`Error in storing data. Error: ${error}`);
        });
    }

    public async fetch(value, numFrom) {
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
            const searchResult: RequestParams.Search = {
                index: "artist",
                type: "_doc",
                body: queryString,
                // analyzer: "my_analyzer",
            };
            const response: ApiResponse<ISearchResponse<ISource>> = await client.search(searchResult);
            return response.body;
        } catch (err) {
            throw new Error(`ElasticSearch error: ${err}`);
        }
    }
}
