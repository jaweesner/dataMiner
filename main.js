const fs = require('fs');
const path = require('path');

//if not testing, call the main function
if (!process.env.TESTENV){
  main(process.argv[2], process.argv[3], process.argv[4]);
}

/**
 *  Main input into the CLI utility. Function will filter contents of file based on options 
 *  and query and print the output to the console. 
 * @param {String} file file path relative to run location of a json formatted file
 * @param {String} option type of filter to apply to json data
 * @param {String} query specific parameter to filter on 
 * @returns {Array<Companies>} filtered array of companies
 */
function main(file, option, query){
  //readFileSync used as all other code depends on file contents
  let companies;
  try{
    companies = fs.readFileSync(path.resolve(file), 'utf8');
  } catch (e) {
    console.log('Error: File could not be read');
    return [];
  } try {
    companies = JSON.parse(companies);
  } catch (e) {
    console.log('Error: file is not properly formatted json');
    return [];
  }

  //define option handling
  
  optionRoutes = {
    locate: ({state}) => state === query,
    find_before: ({year_founded}) => parseInt(year_founded) <= parseInt(query),
    find_after: ({year_founded}) => parseInt(year_founded) >= parseInt(query),
    find_companies_between_size: ({full_time_employees}) => full_time_employees === query,
    find_type: ({company_category}) => company_category === query
  }
  //in case the option is not in object, interpret the same as if query was invalid
  const filteredArray = companies.filter(optionRoutes[option] || (()=>false));
  writeOut(filteredArray);
  return filteredArray;
}

/**
 *  Function prints out to STDOUT the company_name property and number of elements in the given array
 * @param {Array <Companies>} subsetArray - Array of companies that match CLI query
 */
function writeOut(subsetArray){
  if (!subsetArray.length){
    console.log('No companies found with given parameters');
    return;
  } 
  console.log(`Company Names:\n${subsetArray.map(company => company.company_name).join(', ')}\n\nNumber of Companies: ${subsetArray.length}`);
}

// if within a testing context, export functions for unit testing
if (process.env.TESTENV){
  module.exports.writeOut = writeOut;
  module.exports.main = main;
}
