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
        console.log("getSortedArray1")
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
            if (a[sortKey] === undefined || b[sortKey] === undefined) return -1;
            if (a[sortKey] === b[sortKey]) return 0;
            else if (a[sortKey] < b[sortKey]) return -1;
            else return 1;
        } )
    };

    getSortedArray(sortKey) {
        console.log("getSortedArray2")
        let sorted = this.#performSortWithKey(sortKey)
        return sorted;
    }

};


let sorter = new SortArray([10,9,3,6,7,1,4,8,2,5,0]);
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
console.dir(sorter2.getSortedArray())