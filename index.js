const mysql = require('mysql')
const CronJob = require('cron').CronJob;
const crawl = require('./crawl')

new CronJob('0 */1 * * * *', async function() {
    try{
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'crawler'
        })

        connection.connect(async function (err) {
            if (err) throw err;
            console.log("Connected!");
            let crawlData = await crawl.crawler()

            const convertData = crawlData.map(obj => Object.values(obj))

            const sql = "INSERT INTO status (id, name, title, date) VALUES ?;"

            connection.query(sql, [convertData], function (err, result) {
                if (err) throw err;
                console.log("record inserted");
            })

            connection.end(function (err) {
                if (err) throw err;
                console.log("Closed!");
            })
        })
    }catch (e) {
        console.log('error',e)
    }
}, null, true, 'Asia/Tokyo')


