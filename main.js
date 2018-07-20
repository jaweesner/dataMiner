//ingest file

//make choice for file options


//perform operatiron


//output to console:






/**
 *  Function prints out to STDOUT details about companies that match a given CLI query
 * @param {Array <Companies>} subsetArray - Array of companies that match CLI query
 */
//TO CHECK: do I need to make it so the company names will wrap?
function writeOut(subsetArray){
  console.log(`Company Names: 
  ${subsetArray.map(company => company.company_name).join()}

  Number of Companies: ${subsetArray.length}`);
}

