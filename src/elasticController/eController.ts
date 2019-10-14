import { ApiResponse, Client, RequestParams } from "@elastic/elasticsearch";
import slug from "slug";
const client = new Client({ node: "http://localhost:9200" });

interface ISearchBody {
    query: {
        match: { address: string },
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
    public async feed(indexdata, company, address) {
        const indexData = slug(indexdata);
        const feedData = await client.index({
            index: indexData,
            body: {
                address,
                company,
            },
        });
        return feedData;
    }

    public async fetch(index, value) {
        const index1 = slug(index);
        const searchResult: RequestParams.Search<ISearchBody> = {
            index: index1,
            body: {
                query: {
                    match: {
                        address: value,
                    },
                },
            },
        };
        const response: ApiResponse<ISearchResponse<ISource>> = await client.search(searchResult);
        console.log(response.body);
        return response.body;
    }
}
