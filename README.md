# json-to-jsonl-cli
This package extends the [json-to-jsonl package](https://github.com/dan-kwiat/json-to-jsonl) to provide an easy-to-use CLI for its functionality.

## Installation
```
npm install -g github:ThatOneBro/json-to-jsonl-cli.git
```

## Usage
To convert to JSONL from JSON, just use the ```json2jsonl``` command from the terminal and target a valid JSON file containing an array of objects.
The command uses a relative path from the current directory, as so:

```
json2jsonl ../path/from/cwd/to/file
```
or
```
json2jsonl file
```
if the file is in the current directory.

The output file will be created with the same filename in the same directory as the specified JSON file, just with the ```.jsonl``` file extension.

For example,
```
json2jsonl bla/bla.json
```
will create a JSONL file from the specified JSON file called ```bla.jsonl``` in the ```bla``` directory, where ```bla.json``` is located.

### Overwriting Existing Files
If you would like to overwrite an existing JSONL file created from one of your JSON files, just add the ```w+``` indicator as an argument, like so:
```
json2jsonl bla.json w+
```
This will force the conversion at ```bla.jsonl``` even if the file already exists.
