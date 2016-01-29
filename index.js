var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/'));


app.set('view engine', 'ejs');



app.use('/css', express.static('dist/css'));
app.use('/images', express.static('dist/images'));
app.use('/js', express.static('dist/js'));
app.use('/fonts', express.static('dist/fonts'));

app.get('/index.html', function(req, res) {
    res.sendFile('app/home.html', {
        root: __dirname
    });
});

app.get('/index', function(req, res) {
    res.sendFile('app/home.html', {
        root: __dirname
    });
});

app.get('/', function(req, res) {
    res.sendFile('app/home.html', {
        root: __dirname
    });
});

// app.get('/app/*', function(req, res) {
//     res.sendFile('app/index.html', {
//         root: __dirname
//     });
// });

app.get('/app.html', function(req, res) {
    res.sendFile('app/index.html', {
        root: __dirname
    });
});




// app.get('/app.html/', function(req, res) {
//     res.sendFile('app/index.html', {
//         root: __dirname
//     });
// });


// app.get('/app.html/', function(req, res) {
//     res.sendFile('app/index.html', {
//         root: __dirname
//     });
// });




// app.get('/', function(req, res) {
//     res.sendFile('dist/home.html', {
//         root: __dirname
//     });
// });


// app.get('/app', function(req, res) {
//     res.sendFile('dist/index.html', {
//         root: __dirname
//     });
// });


// app.use('/index.html', express.static('pages/index.html'));


// app.use('/css', express.static('public/css'));
// app.use('/fonts', express.static('public/fonts'));
// app.use('/images', express.static('public/images'));
// app.use('/js', express.static('public/js'));
// app.use('/sendemail.php', express.static('sendemail.php'));


// app.use('/app', express.static('pages/lteapp.html'));



// app.use('/app.html', express.static('pages/app.html'));


// app.use('/screen.html', express.static('pages/screen.html'));
// app.use('/screen/:id', express.static('pages/screendisplay.html'));


// app.use('/filerequest/:id', express.static('pages/filerequest.html'));


// app.use('/empty.html', express.static('pages/empty.html'));

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
