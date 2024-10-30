import express from 'express';
import bodyParser from 'body-parser';

const PORT = 3000;
const app = express();

let postId = 0;
const posts = [];

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index.ejs', {
    posts: posts,
  });
});

app.get('/editPost/:id', (req, res) => {
    const id = Number(req.params.id);
    const postIndex = posts.findIndex(post => post.id === id);
    res.render('edit.ejs', {    
      post: posts[postIndex],
    });
  });

  app.get('/deletePost/:id', (req, res) => {
    const id = Number(req.params.id);
    const postIndex = posts.findIndex(post => post.id === id);

    posts.splice(postIndex, 1);
    res.redirect("/");
  });


app.post('/createPost', (req, res) => {
  const id = postId++;
  const title = req.body['title'];
  const content = req.body['content'];
  posts.push({ id: id, title: title, content: content });
  res.redirect("/");
});

app.post('/editPost', (req, res) => {
  const id = Number(req.body['id']);
  const title = req.body['title'];
  const content = req.body['content'];
  const postIndex = posts.findIndex(post => post.id === id);
  posts[postIndex]["title"] =  title
  posts[postIndex]["content"] =  content;
  res.redirect("/");
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
