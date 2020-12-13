
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const port = 8000;

//store users
//let users = [];
let userp = {
    score:40,
    name:"coucou"  
}
app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.post('/user', (req, res) => {
    const newUse=req.body;
    //console.log(req.body.score+" score et player "+req.body.player);
    //userp.score=parseInt(req.body.score,10);
    //userp.name=req.body.player;
    var fs = require('fs');
    let usersRaw = fs.readFileSync('./user.json');
    let users;
    if(usersRaw) users =JSON.parse(usersRaw);
    else{
        users = [];
    }
    for(let user in users){
        console.log(JSON.parse(user));
    }
    users.push(newUse);
    users.sort(compareContent);
    console.log(users);
    
    var json = JSON.stringify(users);
    console.log(json);
    fs.writeFileSync('./user.json', json);

   res.send('User is added to the database');
});


function compareContent(a, b){
    if(a.content < b.content) return -1;
    if(a.content > b.content) return 1;
    return 0;
  }

app.get('/users', (req,res) =>{
    
    var fs = require('fs');
    let data = fs.readFileSync('./user.json');
    res.json(JSON.parse(data));
});



app.listen(port, () => console.log(`User app listening on port ${port}!`));

