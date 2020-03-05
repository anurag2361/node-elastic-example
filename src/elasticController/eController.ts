import { ApiResponse, Client, RequestParams } from "@elastic/elasticsearch";
const client = new Client({ node: "http://localhost:9200" });

interface ISearchBody {
    query: {
        match: {
            artistName: {
                query: string,
                operator: string,
                fuzziness: string,
            },
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
    public async feed(artistId, trackName, kind, artistName: string, collectionName, collectionCensoredName, artistViewUrl, collectionViewUrl, trackViewUrl, previewUrl, artworkUrl100, collectionPrice, releaseDate, collectionExplicitness, trackExplicitness, discCount, discNumber, trackCount, trackNumber, country, currency) {
        await client.index({
            index: "artist",
            type: "_doc",
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

    public async fetch(value, numFrom) {
        try {
            const query = {
                query: {
                    match: {
                        artistName: {
                            query: value,
                            operator: "and",
                            fuzziness: "auto",
                        },
                    },
                },
            };
            const searchResult: RequestParams.Search<ISearchBody> = {
                index: "artist",
                type: "_doc",
                body: query,
            };
            const response: ApiResponse<ISearchResponse<ISource>> = await client.search(searchResult);
            return response.body;
        } catch (err) {
            throw new Error(`ElasticSearch error: ${err}`);
        }
    }
}
