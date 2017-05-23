const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

const app = express()

app.use(express.static('public'))
app.use(bodyParser())

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/word', function(req, res){
  var html = '<form action="/word" method="post">' +
               'word to explore:' +
               '<input type="text" name="lookup1" placeholder="..." />' +
               '<br>' +
               '<button type="submit">go</button>' +
             '</form>'
  res.send(html)
});

app.post('/word', function(req, res){
  var lookup = req.body.lookup1

  request(`http://words.bighugelabs.com/api/2/507ab364c2e364a21c82d0ea6118f4c9/${lookup}/json`,
            function (error, response, body){ console.log(body) }
  )

  var html = 'so: ' + lookup + '<br>' +
               '<form action="/word" method="post">' +
               'word to explore:' +
               '<input type="text" name="lookup1" placeholder="..." />' +
               '<br>' +
               '<button type="submit">go</button>' +
            '</form>'
  res.send(html)
});

app.listen(3000, () => console.log('Server running on port 3000'))
