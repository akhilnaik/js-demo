const parseXMLData = require('xml2js').parseStringPromise;
const fs = require('fs');

class XmlParser {

    constructor() {
    }

    parseXMLFile = async ({filePath}) => {
        let xmlData = {};
        try {
            const fileContent = fs.readFileSync(filePath, {encoding: 'utf8'})
            xmlData = await parseXMLData(fileContent)
        }
        catch (error) {
            console.log('Error reading file')
            throw error
        }
        return xmlData;
    }
};

const parser = new XmlParser();
parser.parseXMLFile({filePath: './data.xml'})
        .then((res)=>{
            console.log("Parsed Object => ");
            console.dir(res, {depth:null});
        })
        .catch(()=>{
            console.log("Promise rejected")
        })