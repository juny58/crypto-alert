const express = require('express')
const app = express()
const port = process.env.port || 4900
const cors = require('cors')
const axios = require('axios')
app.use(cors())

app.get("/latest-price-by-symbols", async (req, res, next) => {
    try {
        const { data } = await axios.get("https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest", {
            params: {
                convert: "INR",
                symbol: req.query.symbols
            },
            headers: {
                "X-CMC_PRO_API_KEY": "66009abe-1723-46f3-8106-216037a0b863"
            }
        })
        return res.send(data)
    } catch (err) {
        return res.status(401).send({ errorRes: err })
    }
})

app.get("/can-add-symbol", async (req, res, next) => {
    try {
        const { data } = await axios.get("https://pro-api.coinmarketcap.com/v1/cryptocurrency/info", {
            params: {
                symbol: req.query.symbol
            },
            headers: {
                "X-CMC_PRO_API_KEY": "66009abe-1723-46f3-8106-216037a0b863"
            }
        })
        return res.send(true)
    } catch (err) {
        return res.send(false)
    }
})

app.listen((port), () => {
    console.log("server running at => ", port)
})