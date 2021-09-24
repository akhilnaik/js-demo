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

class ImageDownloader {
    #destinationFolderPrefix;
    #fileCounter;
    #folderCounter;
    #filesToWait;
    #downloadPromise;

    constructor() {
        this.#destinationFolderPrefix = "./"
        this.#fileCounter = 0;
        this.#folderCounter = 0;
        this.#filesToWait = 0;
    }

    #writeFile = (err, response, data) => {
        if (response.statusCode === 200) {
            if (response.headers['content-type'] === 'image/jpeg') {
            
                let folder = `${this.#destinationFolderPrefix}${this.#folderCounter}`
                if((this.#fileCounter-1)%5 === 0) {
                    this.#folderCounter++;
                    folder = `${this.#destinationFolderPrefix}${this.#folderCounter}`
                    try {
                        fs.mkdirSync(folder)
                    }
                    catch (err) { console.log(`[Warning] failed to create folder ${folder} => ${err}`)}
                }
    
                const filename = `${folder}/${this.#fileCounter}.jpg`
                try {
                    fs.writeFileSync(filename, data)
                    this.#fileCounter++;
                    console.log(`Written file ${filename} from url[${response.request.uri.href}]`)
                } catch(err) {
                    console.log(`[Error] writing file ${filename} ${err}`)
                }
            }
        }
        this.#filesToWait--;
        if(this.#filesToWait == 0) {
            this.#downloadPromise()
        }
    }

    downloadImages = (urls) => {
        this.#fileCounter = 1;
        this.#folderCounter = 0;
        let retval = new Promise((resolve, reject) => { this.#downloadPromise = resolve });
        this.#filesToWait = urls.length;
        urls.map((url)=>{ request.get(url, {encoding: null}, this.#writeFile) })
        return retval
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
gg.downloadImages(inputdata).then(()=>{console.log("All files downloaded")})