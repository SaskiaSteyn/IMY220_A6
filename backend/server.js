import express from "express"
import path from 'path'

//CREATE APP
const app = express();
const {MongoClient, ObjectId} = require("mongodb");
const url = "mongodb://db:27017";


//SERVE A STATIC PAGE IN THE PUBLIC DIRECTORY
app.use(express.static("frontend/public"));

app.use(express.json());

app.post('/posts', async function (req, res) {
  let results = await getAllPosts();
  res.json(results);
})

async function getAllPosts(){
  const client = new MongoClient(url);
  try {
    await client.connect();
    const database = client.db('assignment6');
    const col = database.collection("posts");
    const posts = await col.find({}).toArray();
    return posts;

  } finally {
    await client.close();
    // console.log(playlists);
    // return playlists;
  }
  
}

app.delete('/post', async function (req, res) {
  let results = await deletePost(req.body);
  res.json(results);
})

async function deletePost(requestBody){
  const client = new MongoClient(url);
  try {
    await client.connect();
    const database = client.db('assignment6');
    const col = database.collection("posts");

    console.log(requestBody.id);
    const post = await col.deleteOne({ 'id': requestBody.id });
    return post;

  } finally {
    await client.close();
  }
}

app.patch('/post', async function (req, res) {
  let results = await updatePost(req.body);
  res.json(results);
})

async function updatePost(requestBody){
  const client = new MongoClient(url);
  try {
    await client.connect();
    const database = client.db('assignment6');
    const col = database.collection("posts");

    console.log(requestBody.id);
    const post = await col.updateOne({ 'id': requestBody.id }, { $set: { 'name' : requestBody.name, 'content' : requestBody.content} });
    return post;

  } finally {
    await client.close();
  }
}



app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../../frontend', 'public', 'index.html'));
  });


//PORT TO LISTEN TO
app.listen(3000, () => {
console.log("Listening on localhost:3000");
});