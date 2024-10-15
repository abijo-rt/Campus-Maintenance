
const express = require('express');
const router = express.Router();
const apiController =require('../controller/apiController')
const auth=require('../controller/auth')
const CardData=require('../controller/cardData')
const appdata=require('../controller/appdata')

router.post('/work',apiController.addWork);
router.post('/staff',apiController.addStaff);
router.post('/incharge',auth.addInCharge);
router.get('/worklog',apiController.getWorkData);
router.get('/staff',apiController.getWorkerDetails);
router.get('/getstaff',apiController.getstaffname);
router.post('/locationData',appdata.addlocation);
router.post('/worklog',apiController.editwork);
router.get('/cardinfo',apiController.getcard)
router.get('/dashcardinfo',CardData.getdashcard)
router.get('/cardtype',apiController.getcardtype)
router.post('/login',auth.login);
router.post('/updateworker',apiController.updateworker);

// Export the router
module.exports = router;
const { Router } = require('express');

