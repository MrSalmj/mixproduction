const { MongoClient } = require('mongodb')
var express = require('express')
var app = express()
var rp = require('request-promise')
const port = process.env.PORT || 3000
const api = process.env.TapSecret


app.get('/mongo', (req, res) => {
    const uri =
        "mongodb+srv://salmj99:36925814aA!@@testcluster.chbsb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    async function run() {
        try {
            await client.connect();
            const database = client.db('sample_mflix');
            const movies = database.collection('movies');
            // Query for a movie that has the title 'Back to the Future'
            // const query = { title: 'The Land Beyond the Sunset' };

            // await database.addUser("username", "password", {
            //     roles: [{ role: "read", db: "reporting" },
            //     ]
            // });


            // res.send("hi")
            const query = { runtime: { $lt: 15 } };
            const options = {
                // sort returned documents in ascending order by title (A->Z)
                sort: { title: 1 },
                // Include only the `title` and `imdb` fields in each returned document
                projection: { _id: 0, title: 1, imdb: 1 },
            };
            const cursor = movies.find(query, options)
            // const query = { runtime: { $lt: 10 } }
            // await movies.deleteOne(query).then(() => {
            //     res.send('deleted')
            // }).catch(() => {
            //     res.send('error')
            // })
            const array = await cursor.snapshot().toArray()

            res.send(array.length.toString())

            // res.send(cursor.count())
        } finally {
            // Ensures that the client will close when you finish/error
            await client.close();
        }
    }
    run().catch(console.dir);
})

app.get('/createPayment', async (req, res) => {
    var amount = req.headers.amount
    let _uri = 'https://api.tap.company/v2/charges'
    let _headers = {
        'Content-Type': 'application/json',
        'Authorization': "Bearer sk_test_XKokBfNWv6FIYuTMg5sLPjhJ"
    }
    let _body = {
        "amount": amount,
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
