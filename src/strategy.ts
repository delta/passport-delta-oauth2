import OAuth2Strategy from 'passport-oauth2'
import util from 'util'
import fetch from 'node-fetch'

function DAuthStrategy(options: any, verify: any) {
    options.authorizationURL = "https://auth.delta.nitt.edu/api/oauth/authorize"
    options.tokenURL = "https://auth.delta.nitt.edu/api/oauth/token"

    OAuth2Strategy.call(this, options, verify)

    this.name = 'dauth'
    this._userProfileURL = "https://auth.delta.nitt.edu/api/resources/user"
}

util.inherits(DAuthStrategy, OAuth2Strategy)

DAuthStrategy.prototype.userProfile = function (accessToken: any, done: any) {
    fetch(
        this._userProfileURL,
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }
    )
        .then(res => { res.json().then((profile) => done(null, profile)) })
        .catch(() => done(new Error('Failed to fetch user profile')))
}

export default DAuthStrategy