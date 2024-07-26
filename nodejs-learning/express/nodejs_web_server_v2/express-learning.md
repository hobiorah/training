express takes reg ex in the creation of routes

# regex

- whats in parantheses may not be there. takes routes that have it and dont have it
`app.get('/new-page(.html)?', (req,res) => {`

`app.get('^/$|index(.html)?', (req,res) => {`

# middle ware
//custom middleware = something that every route will execute or have the properties for
## one way - write out full functionality in anonymous funciton
```
//custom middleware = something that every route will execute or have the properties for
app.use((req,res,next) => {
    logEvents(`${req.method}\t ${req.headers.origin}\t${req.url}`, 'reqLog.txt')
    console.log(`${req.method} ${req.path}`)
    next();
})
```

## clean way - pass in a function variable
`app.use(logger);`
```
const logger =  (req,res,next) => {
    logEvents(`${req.method}\t ${req.headers.origin}\t${req.url}`, 'reqLog.txt')
    console.log(`${req.method} ${req.path}`)
    next();
}

module.exports = { logEvents, logger};

```
