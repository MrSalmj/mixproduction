var express = require('express')
var app = express()
var rp = require('request-promise')
const port = process.env.PORT || 3000

app.get('/createPayment', async (req, res) => {
    let _uri = 'https://api.tap.company/v2/charges'
    let _headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer sk_test_XKokBfNWv6FIYuTMg5sLPjhJ'
    }
    let _body = {
        "amount": 1,
        "currency": "BHD",
        "threeDSecure": true,
        "save_card": false,
        "description": "Test Description",
        "statement_descriptor": "Sample",
        "metadata": {
            "udf1": "test 1",
            "udf2": "test 2"
        },
        "reference": {
            "transaction": "txn_0001",
            "order": "ord_0001"
        },
        "receipt": {
            "email": false,
            "sms": true
        },
        "customer": {
            "first_name": "test",
            "middle_name": "test",
            "last_name": "test",
            "email": "test@test.com",
            "phone": {
                "country_code": "965",
                "number": "50000000"
            }
        },
        "merchant": {
            "id": ""
        },
        "source": {
            "id": "src_bh.benefit"
        },
        "post": {
            "url": "http://your_website.com/post_url"
        },
        "redirect": {
            "url": "http://your_website.com/redirect_url"
        }
    }

    var options = {
        method: 'POST',
        uri: _uri,
        body: _body,
        headers: _headers,
        json: true
    };

    rp(options)
        .then(parsedBody => {
            res.send(parsedBody)

        })
        .catch(err => {
            res.send(err)
            //.... Please refer to the following official video: https://www.youtube.com/watch?v=7IkUgCLr5oA&t=1s&list=PLl-K7zZEsYLkPZHe41m4jfAxUi0JjLgSM&index=3
        });

})

app.get('/', async (req, res) => {
    res.send("hello world")
})

app.listen(80, async (req, res) => {
    console.log('server started')

})
