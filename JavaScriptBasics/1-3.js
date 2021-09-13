/*Create an Object Person with Object literals
The Object should have firstName, lastName and age properties*/
let person = {firstName: 'Foo', lastName: 'Bar', age: 30}
console.log('Person object', person)

/*Create an Object MetadataParser using constructor functions
The Object should have private properties _version, _channel, _keyField 
Object should have get and set function for each property
Add a method in the class getKeyFields, which takes an array of JSON objects (eg [{channel: ‘A’}, {channel: ‘B’}, {channel ‘C’}]) as input and returns an array of values of _keyField, input array.*/
class ObjectMetaDataParser {

    #version;
    #channel;
    #keyField;

    constructor() { 
        this.#version = 1;
        this.#channel = 1;
        this.#keyField = 'none';
    }

    setVersion(version){ this.#version = version }
    setChannel(channel){ this.#channel = channel }
    setKeyField(keyField){ this.#keyField = keyField }

    getVersion(){ return this.#version }
    getChannel(){ return this.#channel }
    getKeyField(){ return this.#keyField }

    getKeyFields(objs) { //returns an array of length equal to input array `objs` 
        let valueList = [];
        const customkey = this.#keyField;
        objs.forEach(function(obj) {
            if(obj.hasOwnProperty(customkey)) 
            { 
                valueList.push(obj[customkey])
            }
            else {
                valueList.push(null)
            }
        })
        return valueList;
    }

};

/*Write a function groupObjectsBy which takes as an input an array of JSON objects and returns a grouped object by a key.*/
function groupObjectsBy(objs, keyName) {
    let groupedObj = objs.reduce(function(resultObj, currentObj) {
        if(currentObj.hasOwnProperty(keyName)) {
              const valInObj = currentObj[keyName]
              if(resultObj.hasOwnProperty(valInObj)) resultObj[valInObj].push(currentObj);
              else { resultObj[valInObj] = [currentObj]; }
        }
        return resultObj
    }, {})
    return groupedObj;
}

/*Usage*/
const inputArray = [
    {
      "channel": "A",
      "name": "shoe"
    },
    {
      "channel": "A",
      "name": "electronics"
    },
    {
      "channel": "B",
      "name": "apparel"
    },
    {
      "channel": "C",
      "name": "electronics"
    }
  ]

let groupingKey = 'channel'
let result = groupObjectsBy(inputArray, groupingKey)
console.log(`Grouped by key '${groupingKey}':`)
console.dir(result)

let parser = new ObjectMetaDataParser()
groupingKey = 'name'
parser.setKeyField(groupingKey)
result = parser.getKeyFields(inputArray)
console.log(`List of values for the key '${groupingKey}':`)
console.dir(result)







