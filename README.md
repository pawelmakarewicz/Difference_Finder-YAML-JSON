## Description 
Difference Finder is a program that determines the difference between two data structures. This is a common task for which there are numerous online services, for example, http://www.jsondiff.com/. This mechanism is used when outputting tests or tracking changes in configuration files.

### Utility Features:

- Support for different input formats: YAML, JSON
- Output in plain text, stylish, and JSON format
### Usage example:
```
# plain format
gendiff --format plain path/to/file.yml another/path/file.json

Property 'common.follow' was added with value: false
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group2' was removed

# stylish format
gendiff filepath1.json filepath2.json

{
  + follow: false
    setting1: Value 1
  - setting2: 200
  - setting3: true
  + setting3: {
        key: value
    }
  + setting4: blah blah
  + setting5: {
        key5: value5
    }
}

```

### Hexlet tests and linter status:
[![Actions Status](https://github.com/pawelmakarewicz/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/pawelmakarewicz/frontend-project-46/actions)  
<a href="https://codeclimate.com/github/pawelmakarewicz/frontend-project-46/maintainability"><img src="https://api.codeclimate.com/v1/badges/cfb260e0bede5ca17ede/maintainability" /></a>  
<a href="https://codeclimate.com/github/pawelmakarewicz/frontend-project-46/test_coverage"><img src="https://api.codeclimate.com/v1/badges/cfb260e0bede5ca17ede/test_coverage" /></a>
