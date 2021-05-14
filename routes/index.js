var express = require('express');
var router = express.Router();
var API = require('../api/player');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api', function(req, res, next) {
  res.send({ message: 'Well Done' });
});

router.post('/api/player', async function(req, res, next) {

  const username = req.body.player;

	var region;
	if(req.body.region == "eune"){
		region = "eun1";
	} else if(req.body.region == "euw"){
		region = "euw1";
	} else if(req.body.region == "ru"){
		region = "ru";
	}

	var user = await API.getInitialProfileData(username, region);
	var data = await API.getSummonerData(user, region);

	if(data == 'empty'){
		//handle exception over here
		return;
	}
  
	var matchesData = await API.updatePlayerMatches(user, region);
	res.json({
		user: user,
		data: data,
		matches: matchesData
	})
});

module.exports = router;