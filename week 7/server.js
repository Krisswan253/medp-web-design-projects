//import libraries 
const express = require ('express')
const nunjucks = require ('nunjucks')
//new library 
const cookieParser = require ('cookie-parser')

//initialize our expres application 
let app = express()
nunjucks.configure ("views", {
autoescape: true,
express: app
});

//connect express to nunjucks 
app.set ("view engine", 'njk')

//set up our middleware
app.use (express.static('public'))
app.use (express.urlencoded({extended: true}))

// new middleware
app.use (cookieParser())

// routes come after middleware, but before the listen
app.get('/', (request, response)=>{
    if (request.cookies.visits){
        console.log(request.cookies.visits);
        let visits = request.cookies.visits;
        visits++
        response.cookie('visits', visits,{
            expires: new Date (Date.now() + 1000 * 60 * 60)
        })
    } else {
 // 3 paramters
// 1st: name of the cookie to be storesd
// 2nd: inital value you want to assign it 
// 3rd when the cookie expires, in object format 

let oneHourInMs = 1000 * 60 * 60
response.cookie ("visits", 1, {
    expires: new Date(Date.now()+ oneHourInMs),
    
    })}

    response.render('index.njk', {numVisits: request.cookies.visits}); 
    app.get ('/about.html')

}); 
// last!
app.listen (7001,()=>{
    console.log('http://localhost:7001')
});

