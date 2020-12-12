
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const port = 8000;

//store users
//let users = [];
let userp = {
    name:"coucou",
    score:40
}
app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.post('/user', (req, res) => {
    const newUse=req.body;
    var fs = require('fs');
    let usersRaw = fs.readFileSync('./user.json');
    let users;
    if(usersRaw) users =JSON.parse(usersRaw);
    else{
        users = [];
    }
    for(let user in users){
        console.log(user);
    }
    console.log(users);
    users.push(newUse);
    var json = JSON.stringify(users);
    fs.writeFileSync('./user.json', json);

   res.send('User is added to the database');
});


app.get('/users', (req,res) =>{
    
    var fs = require('fs');
    let data = fs.readFileSync('./user.json');
    res.json(JSON.parse(data));
});



app.listen(port, () => console.log(`User app listening on port ${port}!`));

