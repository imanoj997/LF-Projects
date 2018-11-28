console.log("Assignment 1: Count of items in an array")


function countUnique() {
    nameArray = ['John', 'Mary', 'John', 'John', 'Sherlock', 'Sherlock', "sanjeev", "sanjeev"];

    nameArray.sort();
    
    var current = null;
    var count = 0;
    console.log("{");
    for (var i = 0; i < nameArray.length; i++) {
        if (nameArray[i] != current) {
            if (count > 0) {
                console.log(current + ':' + count + ',');
            }
            current = nameArray[i];
            count = 1;
        } else {
            count++;
        }
    }
    if (count > 0) {
        console.log(current + ':' + count + '}');
    }
}

countUnique();


console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")

console.log("Assignment 2: Flatten an array")

myArray = [[1, 2, 3], [2, 4, 5], 6, { name: 'john' }]

var myNewArray = myArray.reduce(function (acc, val) {
    return acc.concat(val);
});

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

var uniqueArray = myNewArray.filter(onlyUnique);

console.log(uniqueArray);

console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")

console.log("Assignment 3: Search By Name")


var fruits = [
    { id: 1, name: 'Banana', color: 'Yellow' },
    { id: 2, name: 'Apple', color: 'Red' }
];

function searchByName(keyName, array) {
    for (index = 0; index < array.length; index++) {
        if (array[index].name === keyName) {
            return array[index];
        }
    }
}

var output = searchByName('Apple', fruits);
console.log(output);



console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")

console.log("Assignment 4: Normalization")

var people = [{
    id: 1,
    name: "Aegon Targaryen",
    children: [{
        id: 2,
        name: "Jaehaerys Targaryen",
        children: [{
            id: 4,
            name: "Daenerys Targaryen"
        }, {
            id: 5,
            name: "Rhaegar Targaryen",
            children: [{
                id: 6,
                name: "Aegon Targaryen"
            }]
        }]
    }, {
        id: 3,
        name: "Rhaelle Targaryen"
    }],
}];

var output = [];
var person = {};
function normalize(object) {
    for (var index = 0; index < object.length; index++) {
        person = {
            id: object[index].id,
            name: object[index].name,
            children: []
        }
        if (object[index].children === undefined) {
            output.push(person);
            return;
        }
        for (var j = 0; j < object[index].children.length; j++) {
            (person.children).push(object[index].children[j].id);
        }
        output.push(person);
        object = object[index].children;
        normalize(object);
    }
}
normalize(people);
console.log(output)

