const express = require("express")
const http = require("http")
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))

app.get("/", function(req, res){

      res.sendFile(__dirname + "/index.html")
      
});

app.post("/", function(req,res){

      const searchedIP = req.body.ipLookup;
      const url = "http://api.ipstack.com/" +  searchedIP + "?access_key=e5c33160fbd76f3bf4bca48bc2c338d2";
      http.get(url, function(response){
            console.log(response.statusCode);

            response.on("data", function(data){
                  const IP = JSON.parse(data);

                  const RequestCheck = IP.ip;
                  const ipType = IP.type;
                  const ipContinent = IP.continent_name;
                  const ipCountry = IP.country_name;
                  const ipRegion = IP.region_name;
                  const ipCity = IP.city;
                  const ipZip = IP.zip;
                  const ipLatitude = IP.latitude;
                  const ipLongitude = IP.longitude;


                  res.write("<h1> Ip: " + RequestCheck         + "</h1>");
                  res.write("<h1> Type: " + ipType             + "</h1>");
                  res.write("<h1> Country: " + ipCountry       + "</h1>");
                  res.write("<h1> Region: " + ipRegion         + "</h1>");
                  res.write("<h1> City: " + ipCity             + "</h1>");
                  res.write("<h1> Zip: " + ipZip               + "</h1>");
                  res.write("<h1> Latitude: " + ipLatitude     + "</h1>");
                  res.write("<h1> Longitude: " + ipLongitude   + "</h1>");

                  res.send();

            });

      });   
});



app.listen(3000, function(){
      console.log("Server is up on 3000");
});