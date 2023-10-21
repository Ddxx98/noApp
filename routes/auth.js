const express = require('express');
const router = express.Router()
const basicAuth = require('express-basic-auth');

const users = {
    admin: 'password123',
};

router.use(
    basicAuth({
        users,
        challenge: true,
        unauthorizedResponse: 'Authentication required.',
    })
);

module.exports = router