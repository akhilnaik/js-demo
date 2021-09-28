/*Async
For following list of images, download the images parallel and create compressed file and save in a folder file system. Before writing image in the FS print the index of the image in console
http://sousmonarbre.com/qphj/bd963843d2239ed78aa6f7b0a36b537d/qdp/shapely-table-mat-design-office-bay-decoration-mes-at-work-decorating-ideas-office-decoration-mes-design-ideas-cream-wall-paint-decoration-messroom-wooden-laminate-ing-tosca-color__office-decorating-ideas.jpg
https://doodleart.redbull.com/assets/managed/entries/processed/sm/367010617181759_36211000.jpg
https://www.justcolor.net/wp-content/uploads/sites/1/nggallery/doodle-art-doodling/coloring-page-adults-doodle-art-rachel.jpg
https://i.pinimg.com/originals/e5/55/a3/e555a39ca5457a079a9bcce59f61f8d5.jpg
http://canhotopazelite.info/wp-content/uploads/2018/08/office-bay-decoration-themes-with-office-bay-decoration-themes-elegant-yet-fun-office-bay-decoration-14.jpg
https://i.pinimg.com/originals/ef/4c/91/ef4c91fb73e61e19211a0589187ccaa6.jpg
https://static.vecteezy.com/system/resources/previews/000/107/464/non_2x/huge-doodle-vector-pack.jpg
https://i.ytimg.com/vi/O5u1apUkYV0/maxresdefault.jpg
https://media.glassdoor.com/l/e9/c1/7a/84/independence-day-celebration.jpg
For the list of images above, make sure to not save more than 5 image in a folder, if there are more than 5 images create a new folder and saved images
*/
const request = require("request")
const fs = require("fs")
const async = require("async")

class ImageDownloader {
    #destinationFolderPrefix;

    constructor() {
        this.#destinationFolderPrefix = "./"
    }

    downloadImages = (urls, resultCb) => {
        let counter = 0;

        async.forEachOf(urls, (url, index, callback) => {
            console.log(`Index at [${index}]`)
            request.get(url, {encoding: null}, (error, response, data) => {

              if (error) {
                callback(error)
                return;
              }

              if(index === 0 || index === 4) {
                  let gg = 78;
              }

              if (response.statusCode === 200) {
                if (response.headers['content-type'] === 'image/jpeg') {
                    try {
                        let folder = `${this.#destinationFolderPrefix}${Math.floor(counter/5)+1}`
                        let filename = `${folder}/${index}.jpg`
                        if (counter%5 === 0) {
                            counter++
                            fs.mkdirSync(folder)
                        }
                        else {
                            counter++;
                        }
                        fs.writeFileSync(filename, data)
                        console.log(`[${index}] Written file ${filename} from url[${response.request.uri.href}]`)
                    }
                    catch(err) {
                        callback(err)
                        return;
                    }
                    callback();
                }
                else {
                    callback(`Incompatible file format. Format [${response.headers['content-type']}] => [${url}]`)
                }
            }
            else {
                callback(`Error accessing url. Status code [${response.statusCode}] => [${url}]`)
            }
          })
        }, resultCb)
    }
}

let inputdata = ['http://sousmonarbre.com/qphj/bd963843d2239ed78aa6f7b0a36b537d/qdp/shapely-table-mat-design-office-bay-decoration-mes-at-work-decorating-ideas-office-decoration-mes-design-ideas-cream-wall-paint-decoration-messroom-wooden-laminate-ing-tosca-color__office-decorating-ideas.jpg',
'https://doodleart.redbull.com/assets/managed/entries/processed/sm/367010617181759_36211000.jpg',
'https://www.justcolor.net/wp-content/uploads/sites/1/nggallery/doodle-art-doodling/coloring-page-adults-doodle-art-rachel.jpg',
'https://i.pinimg.com/originals/e5/55/a3/e555a39ca5457a079a9bcce59f61f8d5.jpg',
'http://canhotopazelite.info/wp-content/uploads/2018/08/office-bay-decoration-themes-with-office-bay-decoration-themes-elegant-yet-fun-office-bay-decoration-14.jpg',
'https://i.pinimg.com/originals/ef/4c/91/ef4c91fb73e61e19211a0589187ccaa6.jpg',
'https://static.vecteezy.com/system/resources/previews/000/107/464/non_2x/huge-doodle-vector-pack.jpg',
'https://i.ytimg.com/vi/O5u1apUkYV0/maxresdefault.jpg',
'https://media.glassdoor.com/l/e9/c1/7a/84/independence-day-celebration.jpg']

const gg = new ImageDownloader();
gg.downloadImages(inputdata, (err) => {
  if (err) console.log(err)
  else console.log("File downloaded")
})
