const express = require('express');
const router = express.Router();
const axios = require('axios');
const {get_brands_body, get_profile_body} = require('../requests_body/constants')

router.get('/get_brands', async(req, res, next) => {
    const {data} = await axios(get_brands_body);
 
    if(Object.is(data.error, null))
        return res.status(200).send(data.result);
    return res.status(400).send(data.error);
})

router.get('/get_profile/:id/:profile_type', async(req, res, next) => {
    try{
    const {id, profile_type} = req.params;
    const {data} = await axios(get_profile_body(id, profile_type));

    if(!Object.is(data.error, null))
        return res.status(400).send(data.error);

    const profileData = data.resp[id]
    let sumOfEngagement = 0;
    let sumOfFans = 0;
    for (const day in profileData) {
        sumOfEngagement += profileData[day].engagement;
        sumOfFans += profileData[day].followers;
    }   
  
    res.send({"engagement":sumOfEngagement, "fans":sumOfFans});
    }catch(err) {
        res.status(500).send("Eroare de la server");      
    }
})

module.exports = router