const express = require('express');
const app = express();
var cors = require('cors');
const path = require('path');
app.use(cors());

const forceSSL = function () {
    return function (req, res, next) {
        if (req.headers['x-forwarded-proto'] !== 'https') {
            return res.redirect(
                ['https://', req.get('Host'), req.url].join('')
            );
        }
        next();
    }
}

//serve over https
app.use(forceSSL())

app.use(express.static(__dirname + '/dist/loan-amortization-client'));
app.listen(process.env.PORT || 8080);
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname + '/dist/loan-amortization-client/index.html'));
});