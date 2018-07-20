# Data Miner

## To Use
The Data Miner program has been packaged using the npm pkg module to be a more traditional command line utility. This can be run from the dataMiner directory as in the examples below.

It can also be run as a traditional node command line 

### Examples
```
```


## Design Choices
 #### Language
 Javascript is currently my language of choice. I have some familiarity with C and Java,but anything involving a time contraint to produce an MVP, for me, will default to javascript.

 #### Process
Initially, looking at the prompt, I noticed a few areas I would need to design around, primarily with input scalability.  

**First**: I wanted a way to create a better command line interface for a user than just making use of node to run my main file. Running using node for someone who is a JS developer is almost second nature, but for a casual user, those dependencies would not exist and would be a good amount of work to run a simple utility. I looked into ways to create bins from JS and found the pkg module that I could use on my system to create an easily transferrable bin.

**Second**: The program depended on reading from a file on disk and parsing the contents. I couldn''t make the assumption that the file I was reading from was going to be able to fit in memory. And, because the file contents were JSON (instead of CSV, for example), I had to process the whole thing intead of being able to read line by line. 

**Third**: Similar to my second point,  I wanted to make sure that the actions a user could take were efficient. Yes I could, for each instruction, iterate over all objects that I parsed out from the JSON and return a subset (it would be as easy as using the array.filter() method, but could there be a more efficient way?)


