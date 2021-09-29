const parseXMLData = require('xml2js').parseString;
const fs = require('fs');

class XmlParser {

    constructor() {
    }

    parseXMLFile = (filePath, successCb, errorCb) => {
        try {
          const fileContent = fs.readFileSync(filePath, {encoding: 'utf8'})
          parseXMLData(fileContent, function(err, result){
                                          if(err) errorCb(err)
                                          else successCb(result)
                                        })
        }
        catch(err) {
          console.log(`Failed to read XML file ${filePath}`)
          errorCb(err)
        }
    }
};

const parser = new XmlParser();
parser.parseXMLFile('./data.xml', (result)=>{
  console.log('Succeeded to create object from XML')
  console.dir(result, {depth: null})
}, (err) => {
  console.log(`Failed to create object from XML. ${err}`)
})
