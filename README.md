# searchchallenge

## Project setup
```
npm install

node version: v10.16.0
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Run Unit Tests
```
npm run unit-test
```

### Usage
```
Select a group to search in using the buttons at the top.

Select options to search such as searching for empty values, or using advanced search to specify which attributes to search in.

If search for empty value is selected, the search input box will be disabled, as all items with any null values will be displayed, unless advanced 
search is selected, in which case only items with attributes that have been selected and have null values will be displayed.

By default, if advanced search is not selected the application will search all attributes for the specified search string.

For advanced search, if an attribute is selected that an item does not have, it will not appear in the search. If an item has at least one
of the attributes selected, and the value contains the search string, it will appear.
```

