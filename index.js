var express = require('express');
var cors = require('cors');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// POST > api/fileanalyse
function fileanalyseHandler (req, res) {
  console.log(req.file);
  let fileAnalysisResponse = {
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  };
  console.log(fileAnalysisResponse);
  res.json(fileAnalysisResponse);
}

app.post('/api/fileanalyse', upload.single('upfile'), fileanalyseHandler );


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
