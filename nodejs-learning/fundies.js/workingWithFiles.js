const fs = require('fs');
const fsPromises = require('fs').promises; //lets us put readfile in an async function and use try catch

const path = require('path');

fs.readFile('files/yaboy.txt', (err,data) => {
    if (err) throw err;
    console.log(data.toString());
});

let fileAsync = async () => {
    try {
        //unlink deletes a file
    } catch (error) {
        
    }
    
}


console.log("async test");

//build file without hardcoding
    fs.readFile(path.join(__dirname,'files', 'yaboy.txt'), 'utf8', (err,data) => {
        if (err) throw err;
        console.log(data);
    });

    fs.writeFile(path.join(__dirname,'files', 'writeFile.txt'), 'learningggggg', (err) => {
        if (err) throw err;
        console.log("write complete");
    });

    fs.appendFile(path.join(__dirname,'files', 'appendFile.txt'), 'testing appends', (err) => {
        if (err) throw err;
        console.log("append complete");
    });
    


//catching error without try catch
process.on('uncaughtExceptionMonitor', (err, origin) => {
    console.log('caught that bit ' + err);  
    process.exit(1);
});


//read and write stream - more efficient when dealing with large files
const rs = fs.createReadStream(path.join(__dirname,'files', 'lorem.txt'), {encoding: 'utf8'});
const ws = fs.createWriteStream(path.join(__dirname,'files', 'new-lorem.txt'));

rs.on('data', (dataChunk) => {
    ws.write(dataChunk);
})


//making a directory

if(!fs.existsSync('./newDirectory'))
    {
        fs.mkdir('./newDirectory', (err => {
            if (err) throw err;
            console.log("Directory created")
        }))
    }

if(fs.existsSync('./newDirectory'))
{
    fs.rmdir('./newDirectory', (err => {
        if (err) throw err;
        console.log("Directory removed")
    }))
}