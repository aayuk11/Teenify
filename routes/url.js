// const express = require('express');
// const router = express.Router();

// const {
//     handleGenerateNewShortURL,
//     handleRedirectNewShortURL,
//     handleAnalyticsURL,
// } = require('../controllers/url');

// router.post('/index', handleGenerateNewShortURL);
// router.get('/url/:shortID', handleRedirectNewShortURL);
// router.get('/url/analytics/:shortID', handleAnalyticsURL);

// module.exports = router;
const express = require('express');
const router = express.Router();

const { handleGenerateNewShortURL, handleRedirectNewShortURL, handleGetAnalytics } = require("../controllers/url");

router.get('/url/:shortID', handleRedirectNewShortURL);
router.post('/', handleGenerateNewShortURL);
router.get('/analytics/:shortID', handleGetAnalytics);

module.exports = router;
