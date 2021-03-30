const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const port = 3000;

app.use(express.json());  // Return JSON
app.use('/', router); // Set up router to display html pages

let response = {};


router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

// ---------- MEAN ----------
app.get('/mean', (req, res) => {
    if (Object.keys(req.query).length == 0) return res.status(400).send("Invalid! You must supply numbers to the calculator!");
    const { nums } = req.query;
    let total = 0;
    let numArray = createArray(nums);
    numArray.reduce((acc, currVal) => {
        total = acc + currVal;
        return total;
    });
    let numDigits = numArray.length;

    return res.json(
        {
            response: {
                operation: "Mean",
                value: total / numDigits
            }
        }
    );
});

// ---------- MEDIAN ----------
app.get('/median', (req, res) => {
    if (Object.keys(req.query).length == 0) return res.status(400).send("Invalid! You must supply numbers to the calculator!");
    const { nums } = req.query;
    let numArray = createArray(nums);
    sortedArray = numArray.sort((a, b) => a - b);
    response.operation = "Median";
    const midPoint = Math.floor(sortedArray.length / 2);

    if (sortedArray.length % 2 != 0) {
        response.value = sortedArray[midPoint];
    }
    else {
        response.value = (sortedArray[midPoint - 1] + sortedArray[midPoint]) / 2;
    }

    res.json(
        {
            response: {
                operation: "Median",
                value: response.value
            }
        }
    );
});

// ---------- MODE ----------
app.get('/mode', (req, res) => {
    if (Object.keys(req.query).length == 0) return res.status(400).send("Invalid! You must supply numbers to the calculator!");
    const { nums } = req.query;
    let numMapping = {};
    let greatestFreq = 0;
    let mode;
    let numArray = createArray(nums);
    numArray.forEach(function findMode(number) {
        numMapping[number] = (numMapping[number] || 0) + 1;
        if (greatestFreq < numMapping[number]) {
            greatestFreq = numMapping[number];
            mode = number;
        }
        return mode;
    });
    response.operation = 'Mode';
    response.value = mode;
    console.log(response.value);
    res.json({
        response: {
            operation: "Mode",
            value: response.value
        }
    });
});


// Parse number params to an array
function createArray(nums) {
    let numArray = [];
    for (let x of nums) {
        if (x != ',') {
            if (isNaN(parseInt(x))) {
                return res.status(400).send(`${x} is not a number`);
            }
            else {
                numArray.push(parseInt(x));
            }
        }
    } return numArray;
}


app.listen(port, () => {
    console.log(`Calculator app listening at http://localhost:${port}`);
});