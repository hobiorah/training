const http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

const logEvents = require('./middleware/logEvents');
const EventEmitter = require('events');
class Emitter extends EventEmitter { };
// initialize object 
const myEmitter = new Emitter();
myEmitter.on('log', (msg, fileName) => logEvents(msg, fileName));
const PORT = process.env.PORT || 4500;

const serveFile = async (filePath, contentType, response) => {
    try {
        //read file
        //if content type doesnt include image then take utf8 as encoding. if it does contain the word image, then encoing is blank which wont mess up images
        const rawData = await fsPromises.readFile(
            filePath,
            !contentType.includes('image') ? 'utf8' : ''
        );
        //if content type is json then convert file contents into json object. if not, data will hold the raw data from file
        const data = contentType === 'application/json' ? JSON.parse(rawData) : rawData;
        //if file being served up includes 404 then we know to return a 404 code
        response.writeHead(filePath.includes('404.html') ? 404 : 200,{ 'Content-Type': contentType });
        //this send data back
        response.end(contentType === 'application/json' ? JSON.stringify(data) : data);
    } catch (err) {
        console.log(err);
        myEmitter.emit('log', `${err.name}: ${err.message}`, 'errLog.txt');
        //server error
        response.statusCode = 500;
        response.end();
    }
}

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);
    myEmitter.emit('log', `${req.url}\t${req.method}`, 'reqLog.txt');

    //extract file type (extension) from the request the user entered example example.com/hey.html
    const extension = path.extname(req.url);

    let contentType;

    switch (extension) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.jpg':
            contentType = 'image/jpeg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.txt':
            contentType = 'text/plain';
            break;
        default:
            contentType = 'text/html';
    }

    let filePath =
        //first line is condition for ?. if true, return index.html, if false go into a new ? contition
        contentType === 'text/html' && req.url === '/'
            ? path.join(__dirname, 'views', 'index.html')
            //if last character in rquest is / like hey/. issue views[whatever user wrote]/index.hmtl
            : contentType === 'text/html' && req.url.slice(-1) === '/'
                ? path.join(__dirname, 'views', req.url, 'index.html')
                : contentType === 'text/html' //if its html then serve up whats in views/[what usere wrote]
                    ? path.join(__dirname, 'views', req.url)
                    : path.join(__dirname, req.url); //if not html then just serve up what user wrote

    // if extension isnt in the url user submitted add it to the filepath
    //makes .html extension not required in the browser
    if (!extension && req.url.slice(-1) !== '/') filePath += '.html';

    //check if file exists 
    const fileExists = fs.existsSync(filePath);

    if (fileExists) {
        serveFile(filePath, contentType, res);
    } else {
        switch (path.parse(filePath).base) {
            case 'old-page.html':
                res.writeHead(301, { 'Location': '/new-page.html' });
                res.end();
                break;
            case 'www-page.html':
                res.writeHead(301, { 'Location': '/' });
                res.end();
                break;
            default:
                serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res);
        }
    }
});
//always goes at end
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));