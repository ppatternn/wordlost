const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const JefNode = require('json-easy-filter').JefNode
const parseJson = require('parse-json')
const json = '{\n\t"foo": true,\n}'
const app = express()
app.use(express.static('public'))
app.use(bodyParser())
app.set('view engine', 'ejs')


app.get('/word', function(req, res, next){
  lookup = req.query.input_get
  request(`http://words.bighugelabs.com/api/2/507ab364c2e364a21c82d0ea6118f4c9/${lookup}/json`,
        function (error, response, body){
          parsed_body = JSON.parse(body)
          var results = new JefNode(parsed_body).filter(function(node) {
              if (node.level == 3) { return node.value }
            })
          console.log(results)
          res.render('word', { title: 'title via router method',
                               prevlookup: lookup,
                               results: { words: results } })
      })
})

/*
app.post('/word', function(req, res, next){
  lookup = req.body.input1
  request(`http://words.bighugelabs.com/api/2/507ab364c2e364a21c82d0ea6118f4c9/${lookup}/json`,
        function (error, response, body){
          parsed_body = JSON.parse(body)
          var results = new JefNode(parsed_body).filter(function(node) {
              if (node.level == 3) { return node.value }
            })
          console.log(results)
          res.render('word', { title: 'title via router method',
                               prevlookup: lookup,
                               results: { words: results } })
      })
})
*/

app.listen(3000, () => console.log('Server running on port 3000'))
