const request = require('request')
const fs = require('fs')

function downloadUrlToFile(url, filepath) {
    request(url, function (err, res, body) {
        if(err !== null) return;
        if(res && res.statusCode === 200) {
            try {
                fs.writeFileSync(filepath, body)
                console.log(`Finished writing [${url}] to file [${filepath}]`)
            } catch(err) {
                console.log(`Error writing to filesystem [${err}]`)
            }
        }
    })
}

downloadUrlToFile('https://google.com/', 'google.html')