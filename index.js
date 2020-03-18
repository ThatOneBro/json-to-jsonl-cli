const { existsSync, closeSync, openSync } = require('fs');
const path = require('path');
const jsonl = require('json-to-jsonl');

const filename = process.argv[2];

// Check if a filename is specified in command line args
if (!filename) {
  console.log('Please provide a path to the JSON file you want to convert.');
  process.exit(1);
}

// Check if specified file exists
if (!existsSync(filename)) {
  console.log('Please provide a valid path to a JSON file.');
  process.exit(1);
}

// Try to catch files with invalid format
if (!filename.match(/.json$/)) {
  console.log('Please provide a valid JSON file with the appropriate `.json` extension in the filename.');
  process.exit(1);
}

// Give an absolute path by joining absolute reference to cwd with our filename as to not confuse our dependency
// Can still be used for relative paths from base directory of this module
const fullPath = path.join(process.cwd(), filename);

// Check if target file already exists
// If it exists, check if overwrite (w+) argument was given
// If it doesn't exist or it's defined and not equal to w+,
// Then exit and tell user to use the w+ tag if they want to overwrite existing files
const newFile = fullPath.replace(/.json$/, '.jsonl');
if (existsSync(newFile) && process.argv[3] !== 'w+') {
  console.log('A JSONL file with the given filename already exists. If you want to overwrite, issue same command with `w+` tag at the end.');
  process.exit(1);
}

// Create file
closeSync(openSync(newFile, 'w'));

// Try to convert with given json file
let result;
try {

  result = jsonl(fullPath);
} catch (e) {
  console.error(e);
  console.log('Please make sure you provide a valid JSON file and that is formatted properly.');
  process.exit(1);
}

console.log(
  `Result:
    Lines in File: ${result.lines}
    Output File: ${result.file}`
);