const express = require ('express')
const multer = require ('multer')
const nunjucks = require ('nunjucks')
const cookieParser = require ('cookie-parser')
const nedb = require('@seald-ip/nedb');

const app = express();
const database = new nedb ({ filename: 'data.db', autoload: true});
//set up our multer where our files will be stored
//the static part of the path comes from whatever we name our public/assets/static folder
const uploadProcessor = multer ({ dest:'static/upload'});

//use nunjucks inside of our response.render
nunjucks.configure ("views", {
    autoescape: true,
    express: app, 
});

app.set ('view engine', 'njk');
//configure the pp to use the /static
app.use(express.static('static'));
app.use (express.urlencoded({ extended: true }));


app.get ('/', (request,response) => {
    let query = {}
    databasebase.find(query, (err, foundData)=>{
        console.log (foundData); 
        response.render('index.njk', {dataToBeSent: foundData });

    })
    // response.render('index.njk', {DataToBeSent: "hi"});
}); 

app.get ('/make-a-post', (request,response) => {
    response.render('make-post.njk');
});

app.post('/post', uploadProcessor.single("uploadedImage"), (request,response)=>{
    console.log(request.body);
    console.log(request.file);
    let dataToBeStored= {
        dataCaption: request.body.caption, 
        filepath: "/uploads/" + request.file.filename,
        timestamp: Date.now(),
        date: new Date (Date.now()).toLocaleString(),
    };
    console.log(dataToBeStored);

    database.insert(dataToBeStored);

    response.redirect('/make-a-post');
});
app.get ('/post/:id', (request, response)=>{
    let query = {
        _id: request.params.uniquepost
    }
    database.findOne(query, (err, foundData) => {
        console.log (foundData);
        response.render('unique.njk', {dataToBeSend: foundData}); 
    });
})
app.listen (9001, ()=> {
    console.log('server has started on port 9001');
});