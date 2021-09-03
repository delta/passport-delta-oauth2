# passport-delta-oauth2

[Passport](https://passportjs.org/) strategy for authenticating with [DAuth](https://auth.delta.nitt.edu/)
using the OAuth 2.0 API.

This module lets you authenticate using DAuth in your Node.js applications.
By plugging into Passport, DAuth authentication can be easily and
unobtrusively integrated into any application or framework that supports
[Connect](http://www.senchalabs.org/connect/)-style middleware, including
[Express](http://expressjs.com/).

## Install

```bash
$ npm install passport-google-oauth20
```

## Usage

#### Create an Application

Before using `passport-delta-oauth20`, you must register an application with
DAuth. Refer [DAuth Documentation](https://delta.github.io/DAuth-Docs) for more information.

#### Configure Strategy

The DAuth authentication strategy authenticates users using a DAuth account and OAuth 2.0 tokens.  The client ID and secret obtained when creating an application are supplied as options when creating the strategy.  The strategy also requires a `verify` callback, which receives the access token and optional refresh token, as well as `profile` which contains the authenticated user's DAuth profile.  The `verify` callback must call `cb` providing a user to complete authentication.

```javascript
var DAuthStrategy = require('passport-delta-oauth2');

passport.use(new DAuthStrategy(
    {
        clientID: DAUTH_CLIENT_ID,
        clientSecret: DAUTH_CLIENT_SECRET,
        callbackURL: "http://www.example.com/auth/dauth/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ email: profile.email }, function (err, user) {
        return cb(err, user);
        });
    }
));
```

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'dauth'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

```javascript
app.get(
    '/auth/dauth/callback', 
    passport.authenticate('dauth', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    }
);
```

## Examples

* [express-passport-dauth-example](https://github.com/delta/express-passport-dauth-example)

  Illustrates how to use the Google strategy within an [Express](https://expressjs.com)
  application.

## License

[The MIT License](http://opensource.org/licenses/MIT)

## Contributors

- Aananth V (aananthv)

Copyleft (c) 2021 [Delta Force](https://delta.nitt.edu)