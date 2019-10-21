import { ApiResponse, Client, RequestParams } from "@elastic/elasticsearch";
const client = new Client({ node: "http://localhost:9200" });

interface ISearchBody {
    from: number;
    size: number;
    query: {
        bool: {
            should: [
                { match: { "artistName": string } },
                { match: { "trackName": string } },
            ],
        },
    };
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
    constructor() { }
    public async feed(artistId, trackName, kind, artistName, collectionName, collectionCensoredName, artistViewUrl, collectionViewUrl, trackViewUrl, previewUrl, artworkUrl100, collectionPrice, releaseDate, collectionExplicitness, trackExplicitness, discCount, discNumber, trackCount, trackNumber, country, currency) {
        await client.index({
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
    }

    public async fetch(value) {

        const searchResult: RequestParams.Search<ISearchBody> = {
            index: "artist",
            body: {
                from: 0,
                size: 30,
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
        const response: ApiResponse<ISearchResponse<ISource>> = await client.search(searchResult);
        return response.body;
    }
}
