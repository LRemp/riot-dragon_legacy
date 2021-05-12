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

  const username = req.body.username;

	var region;
	if(req.body.region == "eune"){
		region = "eun1";
	} else if(req.body.region == "euw"){
		region = "euw1";
	} else if(req.body.region == "ru"){
		region = "ru";
	}

	var user = await API.getInitialProfileData(username, region);
  console.log(user);
/*
	var data = await getSummonerData(user, region);
	if(data == 'empty'){
		res.render('error', {
			matchesData,
			data,
			user,
			style: "error.css"
		})
		return;
	}
  
	var matchesData = await fetchSummonerMatches(user.id);*/

  console.log('got player request');
  console.log(req.body.player);
  res.json({ title: 'Express' });
});

module.exports = router;