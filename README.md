# Data Miner

## To Use
The Data Miner program has been packaged using the npm pkg module to be a more traditional command line utility. This can be run from the dataMiner directory in the format `./<utility> <filepath> <filter> <query>` as shown in the example run

Three utilities are included, one for each OS 
- main-linux  
- main-macos  
- main-win.exe

The utility can also be run as a traditional node command line with the command `node main.js <filepath> <filter> <query>`

### Example
```
$ ./main-win.exe test/testData.json locate WI
Company Names:
BizVizz, JJ Keller, Locavore

Number of Companies: 3

```
### Testing
The test suite can be run in an environment that has node installed. In the data miner directory, run `npm install` to install the dependencies, then the tests can be run with the command `npm test`. Passing tests will look like the following:
```
$ npm test
> jest --silent

 PASS  test/unit.test.js

Test Suites: 1 passed, 1 total
Tests:       8 passed, 8 total
Snapshots:   0 total
Time:        2.991s
```

## Design Choices
 #### Language
 Javascript is currently my language of choice. I have some familiarity with C and Java, but anything involving a time constraint to produce an MVP, for me, will default to Javascript.

#### Assumptions and Considerations
For this prompt, the largest design decisions were determining which implementation choices would be reasonable, versus something that might be valuable but would be overengineered for the use case. Some choices I made during the process:

-  I briefly considered adding the company objects to a database where I could then index on supported properties to get better efficiency than O(n) for each search. However, since each call to the application took in a new file and performed just one search, the time to add to a database would outweigh the benefit of potentially better lookup.

- I additionally needed to decide if I would need to handle extremely large inputs in regards to time or space. I made the assumption that the file would be able to fit in memory. As we would need to look at every element for the filter to work correctly, there was no way to get around the O(N) time complexity so my initial approach did not need tweaking.

- The main function originally returned nothing and the function that generates the filteredArray Variable was passed directly into the writeOut function,  but I decided to switch to returning an array of the companies as it allowed for more efficient testing ( I could check for more than the console log being called with the correct values).

- Much of the error handling is passive. I handled specific errors with file path and structure, but incorrect filters, query values, or malformed company data will result in a standard 'no companies found with given parameters' message. If deployed to a wider scope of end users, more robust handling may be useful to help users identify incorrect inputs versus a true null value set.

##### Future direction
 I decided to limit my interface to the basic commands given in the spec in order to avoid overcomplication and incorrect assumptions. If this utility were to be deployed widely, I would make some changes:

  - I would refactor the cli to more robustly handle input, potentially with a library such as `commander` so that additional flags (like the ubiquitous --help) would be supported
  - If the utility was going to be used frequently on the same dataset, a --save option could be provided to the utility to cache the dataset and allow users to avoid loading large datasets multiple times. The target filter properties could be indexed at that time to get more efficient queries.
  - It would be fairly simple to expand the filtering options to be any property on the object. instead of a named filter, users could pass in any property and a comparator argument to chose how the filter would be applied to the data.
  - Large (>memory size) data sets handling would be added, potentially by using a transform stream to place parsed data into a database.


## Fun

I was able to get the basic program into a single (glorious? monsterous?) line. Run `node iveCreatedAMonster.js <file> <command> <query>` to see it in action. Less robust with error handling, and a bit dangerous (eval was used, eek), but very fun to make!

```
(({argv: [,,file, option, query]} = process, optionRoutes = {locate: 'state ===', find_before: 'year_founded <=', find_after: 'year_founded >=', find_companies_between_size: 'full_time_employees ===', find_type: 'company_category ==='}, results = JSON.parse(require('fs').readFileSync(file, 'utf-8'), ).filter((company=>eval(`company.${optionRoutes[option] || 'err &&'} '${query}'`)))) => console.log(`Company Names:\n${results.map(({ company_name }) => company_name).join(', ')}\n\nNumber of Companies: ${results.length}`))()
```



