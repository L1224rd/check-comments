const fs = require('fs'); // fileSystem

// process.arvs[2] is the first argument passed to the app in the terminal
fs.readFile(process.argv[2], {encoding: 'utf-8'}, (err, data) => { // utf-8, to get the content as text
    let commentSign = '//'; // comments is JS
    if (process.argv[2].split('.')[1] === 'py') commentSign = '#'; // comments in python
    let totalLines = 0;
    let comments = 0;
    data.split('\n').forEach((line) => { // get the number of lines of the file
        totalLines += 1;
        if(line.includes(commentSign)) comments += 1; // count only one comment per line
    });

    const statusArray = ['terrible', 'bad', 'regular', 'good', 'excelent', 'TOO MUCH']; // feedback to the user

    const ratio = parseInt(comments / totalLines * 100, 10); // percentage of comments in the file

    // 0 - terrible - 10% - bad - 20% - regular - 30% - good - 40% - excelent - 50% - TOO MUCH
    let index = Math.floor(ratio / 10); // round it down to get the right status
    let status = statusArray[index].toUpperCase();

    console.log('totalLines: ', totalLines);
    console.log('comments: ', comments);
    console.log('ratio: ', `${ratio}%`);
    console.log('status: ', status);
});
