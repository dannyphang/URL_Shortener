const express = require('express');
const request = require('request-promise-native');
const articleTitle = require('article-title');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('config');
var getTitleAtUrl = require('get-title-at-url');

const Url = require('../models/Url');

const getTitle = async(url) => {
    const response = await request(url)
    return articleTitle(response)
}

router.post('/shorten', async(req, res) => {
            const { longUrl } = req.body;
            const baseUrl = config.get('baseUrl');

            const url_title = await getTitle(longUrl);

            if (!validUrl.isUri(baseUrl)) {
                return res.status(401).json('Invalid base url');
            }

            // generate url code
            const url_code = shortid.generate();

            // check long url
            if (validUrl.isUri(longUrl)) {
                try {
                    let url = await Url.findOne({ longUrl });
                    console.log(longUrl);

                    if (url) {
                        res.json(url);
                        // console.log(url);
                        // console.log("im here");
                    } else {
                        const shortUrl = `${req.hostname === 'localhost' ? 'http://localhost:5000' : `http://${req.hostname}`}` + "/goto/" + url_code;

                url = new Url({
                    longUrl,
                    shortUrl,
                    url_code,
                    created_date: new Date(),
                    url_title,
                });

                await url.save();
                // console.log("nah, im here!!!");
                res.json(url);
            }
        }
        catch (err) {
            console.error(err);
            res.status(500).json('Server error');
        }
    }
    else {
        res.status(401).json('Invalid long Url');
    }
})

module.exports = router;