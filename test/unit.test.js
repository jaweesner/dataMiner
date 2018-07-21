

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

describe('Test Main CLI function', ()=>{
  
  test('test error handling of incorrect files', (done)=>{
    const mockConsoleLog = jest.spyOn(console, 'log');
    main('notApath', 'locate', 'DC');
    expect(mockConsoleLog).toHaveBeenLastCalledWith('Error: File could not be read');
    main('test/testData.js', 'locate', 'DC');
    expect(mockConsoleLog).toHaveBeenLastCalledWith('Error: file is not properly formatted json');
    done();
  });


})
