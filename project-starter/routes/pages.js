const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.render('index', { title: 'Home' }));
router.get('/privacy', (req, res) => res.render('privacy', { title: 'Privacy Notice' }));
router.get(['/login', '/register'], (req, res) => res.redirect(`/member${req.path}`));

module.exports = router;
