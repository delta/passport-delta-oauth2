"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var passport_oauth2_1 = __importDefault(require("passport-oauth2"));
var util_1 = __importDefault(require("util"));
var node_fetch_1 = __importDefault(require("node-fetch"));
function DAuthStrategy(options, verify) {
    options.authorizationURL = "https://auth.delta.nitt.edu/api/oauth/authorize";
    options.tokenURL = "https://auth.delta.nitt.edu/api/oauth/token";
    passport_oauth2_1.default.call(this, options, verify);
    this.name = 'dauth';
    this._userProfileURL = "https://auth.delta.nitt.edu/api/resources/user";
}
util_1.default.inherits(DAuthStrategy, passport_oauth2_1.default);
DAuthStrategy.prototype.userProfile = function (accessToken, done) {
    console.log("Bearer " + accessToken);
    (0, node_fetch_1.default)(this._userProfileURL, {
        method: 'POST',
        headers: {
            'Authorization': "Bearer " + accessToken
        }
    })
        .then(function (res) { res.json().then(function (profile) { console.log(profile); done(null, profile); }); })
        .catch(function () { return done(new Error('Failed to fetch user profile')); });
};
exports.default = DAuthStrategy;
