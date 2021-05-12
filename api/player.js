var request = require('request');

async function getInitialProfileData(username, region){
    var user = {};
	var URL = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${username}?api_key=${process.env.API_KEY}`;
	console.log(URL);
    await new Promise(function(resolve, reject){
		request(URL, function(err, response, body) {
			if(!err && response.statusCode == 200) {
				var json = JSON.parse(body);
				user.profilePictureId = json.profileIconId;
				user.id = json.id;
				user.accountId = json.accountId;
				user.level = json.summonerLevel;
				user.region = region;
				user.profileIconId = json.profileIconId;
				resolve("finished");
			} else {
				console.log(response.statusCode);
			}
		});
	})
    return user;
}

async function getSummonerData(user, region){

}

async function fetchSummonerMatches(userid){

}

module.exports = { 
    getInitialProfileData,
    getSummonerData,
    fetchSummonerMatches
};