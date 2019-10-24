import { Request, Response, Router } from "express";
import rp from "request-promise";
import { ElasticFunctions } from "./../elasticController/eController";
const router = Router();

router.post("/feedData", async (req: Request, res: Response) => {
    const artist = req.body.artist;
    rp(`https://itunes.apple.com/search?term=${artist}&limit=100000`)
        .then(async (response) => {
            const result = await JSON.parse(response);
            // tslint:disable-next-line: prefer-for-of
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
                await ElasticFunctions.prototype.feed(artistId, trackName, kind, artistName, collectionName, collectionCensoredName, artistViewUrl, collectionViewUrl, trackViewUrl, previewUrl, artworkUrl100, collectionPrice, releaseDate, collectionExplicitness, trackExplicitness, discCount, discNumber, trackCount, trackNumber, country, currency);
            }
            res.send("Done");
        }).catch((error) => {
            throw error;
        });
});

router.post("/getData", async (req: Request, res: Response, next) => {
    const from: number = parseInt(req.query.from, 10);
    const artistName: string = req.body.artistName;
    const trackName: string = req.body.trackName;
    let value = (artistName === undefined || artistName === null) ? trackName : artistName;
    console.log(value);
    if (value.length > 0) {
        const result = await ElasticFunctions.prototype.fetch(value, from);
        res.send(result);
    } else {
        console.log("returning");
        next();
    }
});

export default router;
