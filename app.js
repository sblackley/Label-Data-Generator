let textValue = "";
let textArray = [];
let splitArray = [];
let objArray = [];


// Define object with properties corresponding to requred label fields
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
    // Get search terms from text box
    let querytest = document.getElementById('numberInput').value;

    // Split into array
    let queryArr = querytest.split("\n");

    // For each search term, compare it to each reset number in the CSV array
    for (let i = 0; i < queryArr.length; i++) {
        for (let j = 0; j < splitArray.length; j++) {

            // If the reset in the CSV array contains the search number, create an object with the label properties and add to an array of those objects
            if (splitArray[j][2].includes(queryArr[i])) {
                objArray.push(new Data(splitArray[j][2].replaceAll('"', ''), splitArray[j][1].replaceAll('"', ''), splitArray[j][9].replaceAll('"', ''), splitArray[j][10].replaceAll('"', '')));   
            }
        }
    }

    console.log(objArray); 
    displayData();
}

// Prints the contents of the object array 
function displayData() {
    // First change the date format
    changeDateFormat();

    objArray.forEach(element => {
        console.log(element.name);
        console.log(element.desc);
        console.log(element.startDate);
        console.log(element.endDate);
    });

    // For each object, create a paragraph element populated with the data needed for the reset labels
    objArray.forEach(element => {
        const node = document.createElement("p");
        node.innerHTML = 
           `${element.name} <br>
            ${element.desc} <br>
            Start Date: ${element.startDate} <br>
            End Date: ${element.endDate}`;
        document.getElementById('outputArea').appendChild(node);
    }); 
    
    // Reset all arrays after search is performed to prevent duplicates on subsequent runs
    resetData();
}


function resetData() {
    textArray = [];
    splitArray = [];
    objArray = [];
}

// Changes date format from YYYY-MM-DD to MM-DD-YYYY
function changeDateFormat() {

    let newStartDateArr = [];
    let newEndDateArr = [];
    let temp = ""; 

    let splitStart = [];
    let splitEnd = [];

    // Populate arrays with the start and end date properties for each object
    objArray.forEach(element => {
        newStartDateArr.push(element.startDate);
        newEndDateArr.push(element.endDate);
    });

    // Split dates into array in the form [[YYYY,MM,DD], [YYYY-MM-DD]]
    for (let i = 0; i < objArray.length; i++) {
        splitStart.push(newStartDateArr[i].split('-'));
        splitEnd.push(newEndDateArr[i].split('-'));
    }

    // Move the year to the end of the array
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

    // Rejoin subarrays in the form MM-DD-YYYY
    for (let i = 0; i < objArray.length; i++) {
        newStartDateArr[i] = splitStart[i].join("-");
        newEndDateArr[i] = splitEnd[i].join("-")    
    }

    // Update each object with the new dates in the correct format
    for (let i = 0; i < objArray.length; i++) {
        objArray[i].startDate = newStartDateArr[i];
        objArray[i].endDate = newEndDateArr[i];
    }
    
    console.log(objArray);

    

}

// TODO: Add message to display reset numbers that weren't found
