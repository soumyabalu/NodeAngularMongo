var express = require("express");
var mongoclient = require("mongodb").MongoClient;
var cors = require("cors");
const multer = require("multer");
const req = require("express/lib/request");
const { response } = require("express");
const { request } = require("express");
var app = express();   // we are crating an application using Express script framework . so we are creating an express script object.
app.use(cors()); 
// adding connection string to Mongo DB
var CONNECTION_STRING = "mongodb+srv://soumyabalu:test1234@cluster0.0xscudc.mongodb.net/?retryWrites=true&w=majority";
















// Add databasename for making the mongodb connection and also instantiate the mongo db client
var DATABASENAME= "soumyadb";
var database;
 var numOfDocs;
/*will start the express application and will listen to port given for the incomming requests 
app.listen() will take two arguments one will be port number , second is the lambda function which is used to connect the mongobd using mongoClient. 
here the app.listen will start the app and will listen to the port and at the same time it will establish the mongodb connection using mongoClient.*/

app.listen(5038, ()=>{
    mongoclient.connect(CONNECTION_STRING, (error, client)=>{
        console.log("start connection");
        database=client.db(DATABASENAME);
        console.log("MongDB connection succesful ");

    });
});  
// write API methods to get all node data from the mongodb collection

app.get('/api/soumyaapp/GetNotes', (request, response)=>{
    database.collection("soumyacollection").find({}).toArray((error,result)=>{
        response.send(result);
    });
        

    
});

// we are going to add methods to add and delete notes present in the collection

app.post('/api/soumyaapp/AddNotes',multer().none(),(request, response)=>{
    //database.collection("soumyacollection").count({}, function(error, numOfDocs){
        database.collection("soumyacollection").insertOne({
            //id:(numOfDocs+1).toString(),
            id : numOfDocs+1,
            description:request.body.newNotes
        });
        response.json("Added successfully")
    });
//});

// now we are adding a method to delete a note 

app.delete('/api/soumyaapp/DeleteNotes', multer().none(), (request, response)=>{
   console.log('starting to delete')
    database.collection("soumyacollection ").delete({
     id:request.query.id //we are sending the id in the requst url(via query string) to get deleted.
    });
    response.json("sucessfully deleted");
});

