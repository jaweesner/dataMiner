const fs = require('fs')
function main(file, option, query){
  //ingest file
  const companies = JSON.parse(fs.readFileSync(file, 'utf-8'))

  console.log(companies);
   //perform operation
  optionRoutes = {
    locate: (company) => company.state === query,
    find_before: (company) => company.year_founded <= query,
    find_after: (company) => company.year_founded >= query,
    find_companies_between_size: (company) => company.full_time_employees=== query,
    find_type: (company) => company.company_category === query
  }
  //print result
  writeOut(companies.filter(company => optionRoutes[option](company)));
}
main(process.argv[2], process.argv[3], process.argv[4]);



/**
 *  Function prints out to STDOUT details about companies that match a given CLI query
 * @param {Array <Companies>} subsetArray - Array of companies that match CLI query
 */
//TO CHECK: do I need to make it so the company names will wrap?
function writeOut(subsetArray){
  if (!subsetArray.length){
    console.log('No companies found with given parameters');
    return;
  } 
  console.log(`Company Names:\n${subsetArray.map(company => company.company_name).join(', ')}\n\nNumber of Companies: ${subsetArray.length}`);
}

// if within a testing context, export functions for unit testing
if (process.env.TESTENV = 'true'){
  module.exports.writeOut = writeOut;
}
