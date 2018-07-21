

process.env.TESTENV = true;
const { writeOut, main } = require('../main');
const testData = require('./testData.js');

describe('Console Output Function', ()=>{
  test('should print out correct output based on company array', (done)=>{
    const mockConsoleLog = jest.spyOn(console, 'log');
    writeOut([]);
    expect(mockConsoleLog).toBeCalledWith('No companies found with given parameters');
    mockConsoleLog.mockClear();
    writeOut([{"company_name": "1"},{"company_name": "2"},{"company_name": "3"}]);
    expect(mockConsoleLog).toBeCalledWith(`Company Names:\n1, 2, 3\n\nNumber of Companies: 3`);
    mockConsoleLog.mockRestore();
    done();
  })
})

describe('Test Main CLI function error handline', ()=>{
  
  test('should handle incorrect files elegently', (done)=>{
    const mockConsoleLog = jest.spyOn(console, 'log');
    expect(main('notApath', 'locate', 'DC')).toEqual([]);
    expect(mockConsoleLog).toHaveBeenLastCalledWith('Error: File could not be read');
    expect(main('test/testData.js', 'locate', 'DC')).toEqual([]);
    expect(mockConsoleLog).toHaveBeenLastCalledWith('Error: file is not properly formatted json');
    mockConsoleLog.mockRestore();
    done();
  });

  test('should not error for improper options and queries', (done)=>{
    const mockConsoleLog = jest.spyOn(console, 'log');
    expect(main('test/testData.json', 'locate', 12345)).toEqual([]);
    expect(mockConsoleLog).toHaveBeenLastCalledWith('No companies found with given parameters');
    expect(main('test/testData.json', 'notARoute', 'CA')).toEqual([]);
    expect(mockConsoleLog).toHaveBeenLastCalledWith('No companies found with given parameters');
    mockConsoleLog.mockRestore();
    done();
  })

})

describe('Test Main CLI function routes', () => {
  test('should handle location filtering', (done) => {
    expect(main('test/testData.json', 'locate', 'WI').map(({company_name})=>company_name)).toEqual(['BizVizz', 'JJ Keller', 'Locavore'])
    expect(main('test/testData.json', 'locate', 'N/A')).toEqual([])
    done();
  })

  test('should handle founded date - before filtering', (done) => {
    expect(main('test/testData.json', 'find_before', '9')).toEqual([])
    expect(main('test/testData.json', 'find_before', '1845').map(({company_name})=>company_name)).toEqual(['Citigroup', 'Deloitte', 'Dun & Bradstreet', 'J.P. Morgan Chase'])
    expect(main('test/testData.json', 'find_before', 'ABC')).toEqual([])
    done();
  })
  test('should handle founded date - after filtering', (done) => {
    expect(main('test/testData.json', 'find_after', '100000')).toEqual([])
    expect(main('test/testData.json', 'find_after', '2014').map(({company_name})=>company_name)).toEqual(['48 Factoring Inc.', 'BaleFire Global', 'Compared Care', 'CONNECT-DOT LLC.', "How's My Offer?", "Kimono Labs"])
    expect(main('test/testData.json', 'find_after', '%')).toEqual([])
    done();
  })

  test('should handle company-size filtering', (done) => {
    expect(main('test/testData.json', 'find_companies_between_size', '201-500').map(({company_name})=>company_name)).toEqual(["AccuWeather","Alarm.com","Arpin Van Lines","Atlas Van Lines","Business Monitor International","CAN Capital","Certara","Copyright Clearance Center","DataLogix","Evidera","GitHub","Impaq International","Inrix Traffic","LoopNet","MicroBilt Corporation"])
    expect(main('test/testData.json', 'find_companies_between_size', '8-15')).toEqual([]);
    done();
  })
  test('should handle company-type filtering', (done) => {
    expect(main('test/testData.json', 'find_type', 'Not A Type').toEqual([]);
    expect(main('test/testData.json', 'find_type', 'Food & Agriculture').map(({company_name})=>company_name)).toEqual(["Climate Corporation", "FarmLogs", "Food+Tech Connect", "Locavore", "Mercaris"])
    done();
  })
})
