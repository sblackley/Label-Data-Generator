let textValue = "";
let textArray = [];
let splitArray = [];
let objArray = [];
const PREFIX = "RESET";


class Data {
    constructor(name, desc, startDate, endDate) {
        this.name = name;
        this.desc = desc;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}

function getText() {

    // Clear any remaining paragraphs in output area
    document.getElementById('outputArea').textContent = "";
    
    // 
    if (document.getElementById('textInput').value != null) {
        textValue = document.getElementById('textInput').value;
        console.log(textValue);
    }
    // First split into arrays by lines
    textArray = textValue.split("\n");
    console.log(textArray);

    // Second splits contents of array elements by commas
    textArray.forEach(element => {
        splitArray.push(element.split(","));
    });

    console.log(splitArray);
}

function search() {
    let querytest = document.getElementById('numberInput').value;
    let queryArr = querytest.split("\n");

    for (let i = 0; i < queryArr.length; i++) {
        for (let j = 0; j < splitArray.length; j++) {
            
            if (splitArray[j][2].includes(queryArr[i])) {
                objArray.push(new Data(splitArray[j][2].replaceAll('"', ''), splitArray[j][1].replaceAll('"', ''), splitArray[j][9].replaceAll('"', ''), splitArray[j][10].replaceAll('"', '')));   
            }
        }
    }

    console.log(objArray); 
    displayData();
}

function displayData() {

    changeDateFormat();

    objArray.forEach(element => {
        console.log(element.name);
        console.log(element.desc);
        console.log(element.startDate);
        console.log(element.endDate);
    });

    objArray.forEach(element => {
        const node = document.createElement("p");
        node.innerHTML = 
           `${element.name} <br>
            ${element.desc} <br>
            Start Date: ${element.startDate} <br>
            End Date: ${element.endDate}`;
        document.getElementById('outputArea').appendChild(node);
    }); 
    
    resetData();
}




function resetData() {
    textArray = [];
    splitArray = [];
    objArray = [];
}

// Check this out, this is going to be real stupid
function changeDateFormat() {

    let newStartDateArr = [];
    let newEndDateArr = [];
    let temp = ""; 

    let splitStart = [];
    let splitEnd = [];

    objArray.forEach(element => {
        newStartDateArr.push(element.startDate);
        newEndDateArr.push(element.endDate);
    });

    for (let i = 0; i < objArray.length; i++) {
        splitStart.push(newStartDateArr[i].split('-'));
        splitEnd.push(newEndDateArr[i].split('-'));
    }

    for (let i = 0; i < objArray.length; i++) {
        temp = splitStart[i].shift();
        let tempTrim = temp.trim();
        splitStart[i].push(tempTrim);
                
        temp = splitEnd[i].shift();
        tempTrim = temp.trim();
        splitEnd[i].push(tempTrim);
        
    }
    console.log(splitStart);
    console.log(splitEnd);

    for (let i = 0; i < objArray.length; i++) {
        newStartDateArr[i] = splitStart[i].join("-");
        newEndDateArr[i] = splitEnd[i].join("-")    
    }


    for (let i = 0; i < objArray.length; i++) {
        objArray[i].startDate = newStartDateArr[i];
        objArray[i].endDate = newEndDateArr[i];
    }
    
    console.log(objArray);

    

}

// TODO: Add message to display reset numbers that weren't found


// At this point all of the found numbers have been loaded into the array as objects with the required 
// label fields as properties. The next step is to create HTML elements to display the data from those objects. 
// Research and try: Element#after
// 