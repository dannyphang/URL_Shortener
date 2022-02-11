const express = require('express');
const router = express.Router();
var geoip = require('geoip-lite');

const Url = require('../models/Url');

router.get('/:code', async(req, res) => {
    try {
        // console.log("Request params long: " + url.longUrl);
        const url = await Url.findOne({ url_code: req.params.code }).exec();

        if (url) {
            // if the link is visited
            // url.geolocation = 
            url.visited_count++;

            console.log(req.socket.remoteAddress);

            console.log("Url Visited: " + url.visited_count);

            // var urlObj = JSON.parse((url));
            // var num = 10;
            // urlObj['geolocation'].push({
            //     visited_time: new Date(),
            //     // ip: req.socket.remoteAddress,
            //     // country: getCountry(req.socket.remoteAddress),
            //     ip: "(num++).toString()",
            //     country: "(num++).toString()",
            // })

            url.ip += req.socket.remoteAddress + " ";
            url.visited_time += `${new Date().getDate().toString()}\/${new Date().getMonth().toString()}\/${new Date().getFullYear().toString()}` + " ";

            console.log(`${new Date().getDate().toString()}\/${new Date().getMonth().toString()}\/${new Date().getFullYear().toString()}`);

            url.save();
            return res.redirect(url.longUrl);
        } else {
            return res.status(404).json('No Url found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json('Server error');
    }
});

function getCountry(ip) {
    var geo = geoip.lookup(ip);

    return geo.country;
}

module.exports = router;