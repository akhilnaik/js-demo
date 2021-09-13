/*Implement inheritance. Define a constructor function SortArray which 
Has a property originalArray
Has get function to getSortedArray 
Has a private function to sort the array.
Takes as an input to construct an array of numbers
Define another constructor function (SortObjectArray) which extends SortArray, and is used to sort array of JSON object*/

class SortArray {

    constructor(inputArray)
    {
        this.originalArray = [...inputArray];
    }

    #performSort() {
        let res = [...this.originalArray];
        return res.sort((a,b)=>(a-b))
    };

    getSortedArray() {
        let sorted = this.#performSort()
        return sorted;
    }
};

class SortObjectArray extends SortArray {

    constructor(inputArray)
    {
        super(inputArray);
    }

    #performSortWithKey(sortKey) {
        let res = [...this.originalArray];
        return res.sort((a,b)=>{ 
            if (a[sortKey] === undefined || b[sortKey] === undefined || a[sortKey] < b[sortKey]) return -1;
            if (a[sortKey] === b[sortKey]) return 0;
            else return 1;
        })
    };

    getSortedArray(sortKey) {
        let sorted = this.#performSortWithKey(sortKey)
        return sorted;
    }

};

/*Usage*/
let sorter = new SortArray([10,9,3,6,7,1,4,8,2,5,0]);
console.log(`Array sorted by value`)
console.dir(sorter.getSortedArray())

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

let sorter2 = new SortObjectArray(inputArray);
let key = "name"
console.log(`Array sorted by the key '${key}'`)
console.dir(sorter2.getSortedArray(key))