console.log("ay");

//node-modules holds the javasript files we want to leverage. we dont need this in github because itll take up space, we just have to have a way to know what libraries/js files we need when on a different computer
//the dependencies we need to run our code are defined in the package.json file. npm will use that to know what to download for your project. when using git, we typically put a ignrore for the node_modules folder

# nmp install
will use package.json and download everything in there if not alreayd on your file system

# save a package (js file) as dev dependency 
`npm i nodemon -D`

# scripts
looks to package.json to know what command to execute
`npm run dev` 

# sematinc versioning
- ^ means allow updates to minor and patches but not major
- without ^ update anything
- ~ only update patches
- * use latst option anytime

## isntalling specific version
npm i uuid@[specific versionyou want] without specificty you'll get latest with ^

## updating
- npm update

# exporting code we wrote
`module.expoerts = [method|variableToExport]`
- import by doing
`const varName = require('locationOfFile')`

# turning something we isntalled as dev dependency to be production dependency 
`npm i react-icons --save-prod`

# installing/runnign things without updating your javsript project (package.json) - use npx
`npx json-server -p 3500 -w data/db.json`