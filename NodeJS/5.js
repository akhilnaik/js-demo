const { BitlyClient } = require('bitly')
const stringifyToCSV = require('csv-stringify')
const fs = require('fs')

class UrlShortener {
  #bitlyClient
  #writeStream
  #pendingRows
  #pendingCb

  constructor({bitlyKey})
  {
    this.#bitlyClient = new BitlyClient(bitlyKey, {})
    console.log(`Created bitly shortener with provided key`)
  }

  #writeRowToCSV = (long_url, short_url) => {
    stringifyToCSV([[long_url, short_url]], (error, converted_text) => {
      this.#writeStream.write(converted_text)
      this.#pendingRows--;
      if (this.#pendingRows === 0) {
        this.#writeStream.end()
        this.#pendingCb.call()
      }
    })
  }

  shortenUrls = (url_list, out_file, result_cb) => {
    this.#writeStream = fs.createWriteStream(out_file, {flags:'a'})
    this.#pendingRows = url_list.length
    this.#pendingCb = result_cb
    this.#writeStream.write('Long URL, short URL\n')
    if (this.#pendingRows === 0) {
      this.#writeStream.end()
      this.#pendingCb.call()
    }

    url_list.map((current_url, index) => {
      this.#bitlyClient.shorten(current_url).then((short_url)=>{
        console.log(`shortened [${current_url}] => [${short_url.link}]`)
        this.#writeRowToCSV(current_url, short_url.link)
      })
    })
  }
};

const url_list = [
'http://sousmonarbre.com/qphj/bd963843d2239ed78aa6f7b0a36b537d/qdp/shapely-table-mat-design-office-bay-decoration-mes-at-work-decorating-ideas-office-decoration-mes-design-ideas-cream-wall-paint-decoration-messroom-wooden-laminate-ing-tosca-color__office-decorating-ideas.jpg',
'https://doodleart.redbull.com/assets/managed/entries/processed/sm/367010617181759_36211000.jpg',
'https://www.justcolor.net/wp-content/uploads/sites/1/nggallery/doodle-art-doodling/coloring-page-adults-doodle-art-rachel.jpg',
'https://i.pinimg.com/originals/e5/55/a3/e555a39ca5457a079a9bcce59f61f8d5.jpg',
'http://canhotopazelite.info/wp-content/uploads/2018/08/office-bay-decoration-themes-with-office-bay-decoration-themes-elegant-yet-fun-office-bay-decoration-14.jpg',
'https://i.pinimg.com/originals/ef/4c/91/ef4c91fb73e61e19211a0589187ccaa6.jpg',
'https://static.vecteezy.com/system/resources/previews/000/107/464/non_2x/huge-doodle-vector-pack.jpg',
'https://i.ytimg.com/vi/O5u1apUkYV0/maxresdefault.jpg',
'https://media.glassdoor.com/l/e9/c1/7a/84/independence-day-celebration.jpg',
]


const csv_file = 'urls.csv'
let shortener = new UrlShortener({bitlyKey: 'yourBitlyKey'});
shortener.shortenUrls(url_list, csv_file, function(){
  console.log(`finished writing to csv [${csv_file}]`);
});
