const fs = require('fs');

const list_l = [];
const list_r = [];
let iterate = true;
let min_l;
let min_r;
let sum = 0;

// 1. Get arrays of numbers from file.
try {
    // Read the file synchronously
    const data = fs.readFileSync('materials/dec1.txt', 'utf8');

    // Split the file content into lines
    const lines = data.split('\n');

    lines.forEach(line => {
        // Skip empty lines
        if (line.trim() === '') return;

        // Split the line into two parts
        const [left, right] = line.split(':');

        // Push the values into respective arrays after converting to numbers
        if (left && right) {
            list_l.push(parseInt(left.trim(), 10));
            list_r.push(parseInt(right.trim(), 10));
        }
    });
} catch (err) {
    console.error('Error reading the file:', err);
}

// Arrays must be of the same size
if(list_l.length != list_r.length){
    console.log("Arrays are of different size. Aborting...");
}

// 2. Calculate sum of every pair difference.
while(iterate){
    // get smallest number from each list
    min_l = Math.min(...list_l);
    min_r = Math.min(...list_r);

    // add number difference to total sum
    sum += Math.abs(min_r - min_l);

    // delete smallest number from each list
    list_l.splice(list_l.indexOf(min_l), 1);
    list_r.splice(list_r.indexOf(min_r), 1);

    // check if array still has values. If not - stop iterating
    if(list_l.length < 1 && list_r.length < 1){
        iterate = false;
    }
}

// Result
console.log(sum);



