var express = require("express");
var path = require("path");
var router = express.Router();

var friends = require("../data/friends");

router.use(function timeLog(req, res, next) {
    console.log("Time: ", Date.now());
    next();
});

router.get("/api/friends", function (req, res) {
    res.json(friends);
});

router.post("/api/friends", function (req, res) {
    
    var user = req.body;
    console.log(user);

    var userScoresArr = [];
    for (var i = 0; i < user.scores.length; i++) {
        userScoresArr.push(parseInt(user.scores[i]));
    }

    var friendIndex = 0;
    var currentDif = ((5-1)*10);

    for (var i = 0; i < friends.length; i++) {
        var totalDifference = 0;

        for (var j = 0; j < friends[i].scores.length; j++) {
            var diff = Math.abs(userScoresArr[j] - friends[i].scores[j]);
            totalDifference += diff;
        }

        if (totalDifference < currentDif) {
            friendIndex = i;
            currentDif = totalDifference;
        }
    }

    friends.push(user);

    res.json(friends[friendIndex]);
});

module.exports = router;