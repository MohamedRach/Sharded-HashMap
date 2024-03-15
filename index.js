const express = require('express'); 
const fs = require("fs");  
const app = express(); 
const crypto = require('crypto');
const PORT = 3000; 


app.use(express.json())

const M = 3; 
const databaseServers = Array.from({ length: M }, (_, i) => `./db/db${i+1}.json`);

const getShard = (key) => {
    const hash = crypto.createHash('sha1');
    hash.update(key);
    const keyHash = parseInt(hash.digest('hex'), 16);
    const serverIndex = keyHash % M;
    return databaseServers[serverIndex];
}
app.get("/api/:key", (req, res) => {
    const key = req.params.key;
    const db = getShard(key);
    const data = getSingleHashMapData(key, db);
    console.log(`Getting data with key '${key}' on server '${db}'`);
    res.send(data)
})

app.post("/api", (req, res) => {
    const { key, value } = req.body;
    const db = getShard(key);
    const jsonData = JSON.parse(fs.readFileSync(db))
    jsonData[key] = value
    HashmaptData(jsonData, db)
    console.log(`Storing data with key '${key}' on server '${db}'`);
    res.send("added successfuly")
})

app.delete("/api/:key", (req, res) => {
    const key = req.params.key;
    const db = getShard(key);
    const jsonData = JSON.parse(fs.readFileSync(db))
    delete jsonData[key]
    HashmaptData(jsonData, db)
    console.log(`Deleting data with key '${key}' on server '${db}'`);
    res.send("delete endpoint called")
})

const HashmaptData = (data, db) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync(db, stringifyData)
}
const getSingleHashMapData = (key, db) => {
    const jsonData = fs.readFileSync(db)
    return {value: JSON.parse(jsonData)[key]}   
}

app.listen(PORT, (error) =>{ 
    if(!error) 
        console.log("Server is Successfully Running,and App is listening on port "+ PORT) 
    else 
        console.log("Error occurred, server can't start", error); 
    } 
); 