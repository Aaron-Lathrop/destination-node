'use strict';
require('dotenv').config();

exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://demo:demo123@ds263619.mlab.com:63619/destination-app';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://demo:demo123@ds151180.mlab.com:51180/test-destination-app';
exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';