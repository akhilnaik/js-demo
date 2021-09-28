const request = require('request')
const fs = require('fs')

function downloadUrlToFile(url, filepath, successCb, errorCb) {
  try {
    const ee = request.get(url)
    ee.on('error', function(error) {
      errorCb(err)
    }).pipe(fs.createWriteStream(filepath))

    ee.on('response', function(response) {
      successCb(response.statusCode)
    })
  }
  catch(err) {
    errorCb(err)
  }
}

downloadUrlToFile('https://google.com/', 'google.html', (result)=>{
  console.log(result)
}, (err)=>{
  console.error(err)
})
