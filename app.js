const fs = require('fs'); // fileSystem

// process.arvs[2] is the first argument passed to the app in the terminal
fs.readFile(process.argv[2], { encoding: 'utf-8' }, (err, data) => { // utf-8, to get the content as text
  let commentSign = '//'; // comments is JS
  if (process.argv[2].split('.')[1] === 'py') commentSign = '#'; // comments in python
  let totalLines = 0;
  let comments = 0;
  let MLCFlag = false; // MLC stands for Multiple Line Comment
  data.split('\n').forEach((line) => { // get the number of lines of the file
    totalLines += 1;
    if (line.includes(commentSign)) comments += 1; // count only one comment per line
    if (line.includes('/*')) MLCFlag = true; // turn on the flag to count every line of the comment
    if (line.includes('*/')) {
      // end of the comment, don't count anymore
      comments += 1;
      MLCFlag = false;
     } 
    if (MLCFlag) comments += 1;
  });

  const statusArray = ['terrible', 'bad', 'regular', 'good', 'excelent', 'excelent', 'maybe too much...']; // feedback to the user

  const ratio = Math.floor(comments / totalLines * 100); // percentage of comments in the file

  const index = Math.floor(ratio / 8); // round it down to get the right status
  const status = index < 6 ? statusArray[index].toUpperCase() : 'There\'s more comments than code...';

  const fileName = process.argv[2].split('/')[process.argv[2].split('/').length - 1];
  
  let numOfEquals = ''; // just so the output is pretty

  for (let i = 0; i < fileName.length + 22; i++) { // there are 20 equals e 2 spaces in line 30
    numOfEquals += '=';
  }

  console.log(`
    // ========== ${fileName} ========== //

    - totalLines: ${totalLines}
    - comments: ${comments}
    - ratio: ${ratio}%
    - status: ${status}

    // ${numOfEquals} //
  `);
});
