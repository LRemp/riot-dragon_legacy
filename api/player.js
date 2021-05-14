var request = require('request');

async function getInitialProfileData(username, region){
    var user = {};
	var URL = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${username}?api_key=${process.env.API_KEY}`;
    await new Promise(function(resolve, reject){
		request(URL, function(err, response, body) {
			if(!err && response.statusCode == 200) {
				user = JSON.parse(body);
				resolve("finished");
			} else {
				console.log(response.statusCode);
			}
		});
	})
    return user;
}

async function getSummonerData(user, region){
	var data = {};
	var URL = `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${user.id}?api_key=${process.env.API_KEY}`;
	await new Promise(function(resolve, reject){
		request(URL, function(err, response, body) {
			if(!err && response.statusCode == 200) {
				var json = JSON.parse(body);
				if(json[0] == null){
					data = "empty";
					resolve('finished');
				} else {
					for(var i = 0; i < json.length; i++){
						if(json[i].queueType == "RANKED_SOLO_5x5") {
							data.soloTier = json[i].tier;
							data.soloRank = json[i].rank;
							data.soloLP = json[i].leaguePoints + " LP";
							data.soloWins = json[i].wins;
							data.soloLosses = json[i].losses;
							data.soloWinrate = Math.round((data.soloWins / (data.soloWins + data.soloLosses)) * 100);
							data.soloImg = data.soloTier.toLowerCase();
							data.soloHasRank = true;
						} else if(json[i].queueType == "RANKED_FLEX_SR"){
							data.flexLP = json[i].leaguePoints + " LP";
							data.flexTier = json[i].tier;
							data.flexRank = json[i].rank;
							data.flexWins = json[i].wins;
							data.flexLosses = json[i].losses;
							data.flexWinrate = Math.round(data.flexWins / (data.flexWins + data.flexLosses));
							data.flexImg = data.flexTier.toLowerCase();
							data.flexHasRank = true;
						}
					}
					if(!data.flexTier){
						data.flexTier = "Unranked";
						data.flexImg = "unranked";
						data.flexHasRank = false;
					} else if(!data.soloTier){
						data.soloTier = "Unranked";
						data.soloImg = "unranked";
						data.soloHasRank = false
					}
					data.name = json[0].summonerName;
				}
			} else {
				console.log(response.statusCode);
			}
			resolve('finished');
		});
	});
	return data;
}

async function fetchSummonerMatches(userid){

}

async function fetchMatches(user, region) {
	var data = {}
	var URL = `https://${region}.api.riotgames.com/lol/match/v4/matchlists/by-account/${user.accountId}?api_key=${process.env.API_KEY}`;
	await new Promise(function(resolve, reject){
		request(URL, function(err, response, body) {
			if(!err && response.statusCode == 200) {
				var json = JSON.parse(body);
				data = json.matches;
			} else {
				console.log(response.statusCode);
			}
			resolve('finished');
		});
	})
	return data;
}

async function updatePlayerMatches(user, region) {
	var matches = await fetchMatches(user, region);
	var matchesData = [];
	for(var i = 0; i < 10; i++){
		var gameId = matches[i].gameId;
		var URL = `https://${region}.api.riotgames.com/lol/match/v4/matches/${gameId}?api_key=${process.env.API_KEY}`;
		var matchData = [];
		var championsData = [];
		var players = {};
		console.log(`fetching match ${i}`);
		await new Promise(function(resolve, reject){
			request(URL, async function(err, response, body) {
				if(!err && response.statusCode == 200) {
					var json = JSON.parse(body);
					matchData = json;
					var playerData = {};
					for(var item in matchData.participants) {
						var data = matchData.participants[item].timeline;
						var data2 = matchData.participants[item].stats;
						var data3 = matchData.participants[item];

				
						if(matchData.participants[item].championId == matches[i].champion){
							playerData.level = data2.champLevel;
							playerData.kills = data2.kills;
							playerData.deaths = data2.deaths;
							playerData.assists = data2.assists;
							playerData.perkPrimaryName = await getPerkName(data2.perk0, data2.perkPrimaryStyle);
							playerData.perkSubStyleName = await getPerkStyleName(data2.perkSubStyle);
							playerData.spell1ID = await getSummonerSpellName(matchData.participants[item].spell1Id);
							playerData.spell2ID = await getSummonerSpellName(matchData.participants[item].spell2Id);
							playerData.cs = data2.totalMinionsKilled + data2.neutralMinionsKilled;
							if(data2.win == true){
								playerData.result = "Victory";
							} else {
								playerData.result = "Defeat";
							}
							playerData.itemLinks = {};
							playerData.itemLinks[0] = await getItemName(data2.item0);
							playerData.itemLinks[1] = await getItemName(data2.item1);
							playerData.itemLinks[2] = await getItemName(data2.item2);
							playerData.itemLinks[3] = await getItemName(data2.item3);
							playerData.itemLinks[4] = await getItemName(data2.item4);
							playerData.itemLinks[5] = await getItemName(data2.item5);
							playerData.itemLinks[6] = await getItemName(data2.item6);
						}
						if (matchData.queueId == 430){
							matchData.matchType = "Normal";
						} else if(matchData.queueId == 420){
							matchData.matchType = "Ranked Solo";
						} else if(matchData.gameMode == "URF"){
							matchData.matchType = "URF";
						}

						if(data3.teamId == 100){
							if(data.lane == 'BOTTOM'){
								if(data.role == 'DUO_SUPPORT'){


								} else if(data.role == 'DUO_CARRY'){

								}
							} else if(data.lane == 'JUNGLE'){

							} else if(data.lane == 'MIDDLE'){

							} else if(data.lane == 'TOP'){

							}
						} else if(data3.teamId == 200){
							if(data.lane == 'BOTTOM'){
								if(data.role == 'DUO_SUPPORT'){

								} else if(data.role == 'DUO_CARRY'){

								}
							} else if(data.lane == 'JUNGLE'){

							} else if(data.lane == 'MIDDLE'){

							} else if(data.lane == 'TOP'){

							}
						}

						championData = ({ championName: championName, championId: matchData.participants[item].championId});
						championsData.push(championData);
					}
					var championName = await getChampionName(matches[i].champion);
					championData = ({ championName: championName, championId: matches[i].champion});
					playerData.championData = championData;
					var obj = {championsData: championsData, matchData: matchData, playerData: playerData, players: players};
					matchesData.push(obj);
				} else {
					console.log(response.statusCode);
				}
				resolve('finished');
			});
		})
		/*await rp(URL)
				.then(function (body) {
						var json = JSON.parse(body);
						matchData = json;
				})
				.then(function(matchDatas) {
						var playerData = {};
						for(var item in matchData.participants) {
							var data = matchData.participants[item].timeline;
							var data2 = matchData.participants[item].stats;
							var data3 = matchData.participants[item];

					
							if(matchData.participants[item].championId == matches[i].champion){
								playerData.level = data2.champLevel;
								playerData.kills = data2.kills;
								playerData.deaths = data2.deaths;
								playerData.assists = data2.assists;
								playerData.perkPrimaryName = getPerkName(data2.perk0, data2.perkPrimaryStyle);
								playerData.perkSubStyleName = getPerkStyleName(data2.perkSubStyle);
								playerData.spell1ID = getSummonerSpellName(matchData.participants[item].spell1Id);
								playerData.spell2ID = getSummonerSpellName(matchData.participants[item].spell2Id);
								playerData.cs = data2.totalMinionsKilled + data2.neutralMinionsKilled;
								if(data2.win == true){
									playerData.result = "Victory";
								} else {
									playerData.result = "Defeat";
								}
								playerData.itemLinks = {};
								playerData.itemLinks[0] = getItemName(data2.item0);
								playerData.itemLinks[1] = getItemName(data2.item1);
								playerData.itemLinks[2] = getItemName(data2.item2);
								playerData.itemLinks[3] = getItemName(data2.item3);
								playerData.itemLinks[4] = getItemName(data2.item4);
								playerData.itemLinks[5] = getItemName(data2.item5);
								playerData.itemLinks[6] = getItemName(data2.item6);
							}
							if (matchData.queueId == 430){
								matchData.matchType = "Normal";
							} else if(matchData.queueId == 420){
								matchData.matchType = "Ranked Solo";
							} else if(matchData.gameMode == "URF"){
								matchData.matchType = "URF";
							}

							if(data3.teamId == 100){
								if(data.lane == 'BOTTOM'){
									if(data.role == 'DUO_SUPPORT'){


									} else if(data.role == 'DUO_CARRY'){

									}
								} else if(data.lane == 'JUNGLE'){

								} else if(data.lane == 'MIDDLE'){

								} else if(data.lane == 'TOP'){

								}
							} else if(data3.teamId == 200){
								if(data.lane == 'BOTTOM'){
									if(data.role == 'DUO_SUPPORT'){

									} else if(data.role == 'DUO_CARRY'){

									}
								} else if(data.lane == 'JUNGLE'){

								} else if(data.lane == 'MIDDLE'){

								} else if(data.lane == 'TOP'){

								}
							}

							championData = ({ championName: championName, championId: matchData.participants[item].championId});
							championsData.push(championData);
						}
						var championName = getChampionName(matches[i].champion);
						championData = ({ championName: championName, championId: matches[i].champion});
						playerData.championData = championData;
						var obj = {championsData: championsData, matchData: matchData, playerData: playerData, players: players};
						matchesData.push(obj);
				})
				.catch(function (err) {
					console.log(err);
				});*/
	}
	return matchesData;
}

async function getPerkName(perkID, perkStyle) {
	//http://ddragon.leagueoflegends.com/cdn/10.16.1/data/en_US/runesReforged.json
	var name = "none";
	var URL = `http://ddragon.leagueoflegends.com/cdn/10.16.1/data/en_US/runesReforged.json`;
	await new Promise(function(resolve, reject){
		request(URL, function(err, response, body) {
			if(!err && response.statusCode == 200) {
				var data = JSON.parse(body);
				for(var item in data){
					if(data[item].id == perkStyle){
						var data2 = data[item].slots;
						for(var index in data2){
							var data3 = data2[index].runes;
							for(var index2 in data3){
								if(data3[index2].id == perkID){
									name = data3[index2].icon;
									resolve('finished');
								}
							}
						}
					}
				}
			} else {
				console.log(response.statusCode);
			}
			resolve('finished');
		});
	})

	return name;
}

async function getPerkStyleName(perkStyle) {
	var name = "none";
	var URL = `http://ddragon.leagueoflegends.com/cdn/10.16.1/data/en_US/runesReforged.json`;
	await new Promise(function(resolve, reject){
		request(URL, function(err, response, body) {
			if(!err && response.statusCode == 200) {
				var data = JSON.parse(body);
				for(var item in data){
					if(data[item].id == perkStyle){
						name = data[item].icon;
						resolve('finished');
					}
				}
			} else {
				console.log(response.statusCode);
			}
			resolve('finished');
		});
	})

	return name;
}

async function getSummonerSpellName(spellID) {
	var name = "none";
	var URL = `http://ddragon.leagueoflegends.com/cdn/10.16.1/data/en_US/summoner.json`;
	await new Promise(function(resolve, reject){
		request(URL, function(err, response, body) {
			if(!err && response.statusCode == 200) {
				var data = JSON.parse(body);
				for(var item in data.data)
					if(data.data[item].key == spellID) {
						name = data.data[item].id;
						resolve('finished');
					}
			} else {
				console.log(response.statusCode);
			}
			resolve('finished');
		});
	})

	return name;
}

async function getItemName(itemID) {
	var name = "none";
	var URL = `http://ddragon.leagueoflegends.com/cdn/10.16.1/data/en_US/item.json`;
	await new Promise(function(resolve, reject){
		request(URL, function(err, response, body) {
			if(!err && response.statusCode == 200) {
				var data = JSON.parse(body);
				for(var item in data.data){
					if(item == itemID){
						name = data.data[item].image.full;
						resolve('finished');
					}
				}
			} else {
				console.log(response.statusCode);
			}
			resolve('finished');
		});
	})

	return name;
}

async function getChampionName(championId) {
	var name = "none";
	var URL = `http://ddragon.leagueoflegends.com/cdn/10.16.1/data/en_US/champion.json`;
	await new Promise(function(resolve, reject){
		request(URL, function(err, response, body) {
			if(!err && response.statusCode == 200) {
				var champions = JSON.parse(body);
				for(var item in champions.data){
					if(champions.data[item].key == championId){
						name = champions.data[item].id;
						resolve('finished');
					}
				}
			} else {
				console.log(response.statusCode);
			}
			resolve('finished');
		});
	})
	return name;
}

module.exports = { 
    getInitialProfileData,
    getSummonerData,
    fetchSummonerMatches,
	updatePlayerMatches,
	getPerkName,
};