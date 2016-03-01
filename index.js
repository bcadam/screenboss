var express = require('express');  // find this line in the file
var cors = require('cors') // add this line below it
var favicon = require('serve-favicon');
var Parse = require('parse');
var ParseServer = require('parse-server').ParseServer;
var apiRouter = require('./api.js');

var parseServer = new ParseServer({
  databaseURI: 'mongodb://main:main@ds013918.mlab.com:13918/screenboss',
  cloud:  __dirname + '/cloud/cloud/mainownserver.js',
  appId: 'pp9waK9ticOFbhrJzrdITkRVQfCycHLqNPj2ZrN6',
  masterKey: 'Pp9mBdqFMmnjFLT4skUMif2Tz7bie3hCqKv5CfRj',
  fileKey: '8ed68dcf-74f0-4188-a8e8-720e68bfa90b',
  serverURL: '/parse'
});

var app = express();
app.use(cors());
app.use('/api', apiRouter);
app.use('/parse', parseServer);

app.use(favicon('app/images/favicon.ico'));
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/'));
app.set('view engine', 'ejs');
app.use('/css', express.static('dist/css'));
app.use('/images', express.static('dist/images'));
app.use('/js', express.static('dist/js'));
app.use('/fonts', express.static('dist/fonts'));
app.use('/public/install', express.static('public/ScreenBossLocal.zip'));
app.use('/public', express.static('public'));

app.get('/*', function(req, res) {
    res.sendFile('app/index.html', {
        root: __dirname
    });
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});

/**
                                                             ,,,,                                                     
                                                       :i;;;1Lfft11;;i:,.                                             
                                                     ;LCCCCCLLLLCLLLLLfft:,,.                                         
                                                 ,ifLCCCCCCLLLLCCCCCCCCLfLfLf,                                        
                                               .tCCCCCCCCCCLLCCCCCCCCCCCLLLLCf:                                       
                                             .1LCCCCCCCCCCCLLCCCCCCCLLLLLLLffLL1:.                                    
                                            .fCCCCCCCCCCCCCCCCCCCCCCCCLCCLLtLLLftt;                                   
                                            1CCCCCLLCLCCCCLLffft1tfft1i11111;;1f1fi                                   
                                           ;CCCCCLtt1111i;;::::,,,,,........  .;tL1                                   
                                          ;CCCCCL1;;;;::,,,,,,,,,............  .;ff                                   
                                          1CCCCCLt;;;:::,,,,,,,,............    ,1L.                                  
                                          iCCCCCL1;::::::,,,,,,,,...............,1L1                                  
                                          iCCCCLf1;;::::::,,,,,,,,...............1Lt                                  
                                          1CCCCf1;;;::::,,,..............  ..... ;f:                                  
                                          :CCCL1;;;ii11iiiii;:,,,..,,,:::::,.... :t                                   
                                           tCCf;;ii1111ii1ttt1i::,,,:;i11ii;:,,. ,i                                   
                                         ::iLCf;;;iiiii111i1tt1i::,,:i11111i;:,, ,;                                   
                                         11:;Lt:;;;itt1tLt:;111i;,..:i111ft;;::,..,..                                 
                                         :;;iff;;;;;;;;::;;;;;i;;:..,,::;:,,........                                  
                                          ;1tit;;;;::::::::::;;;i;,......,,,.... ..                                   
                                          ,i1;;;;;:::,,,,,::;;;i;:,.. ..,..........                                   
                                           ::;;;;:::::,,,,:;ii;i;:,,.,,.:;:,.....                                     
                                           .:;;;;;;;:::::iiiii11ti;;:;:,::ii:,,..                                     
                                             ...:;;i;::;ii;;;;;;;;;;:,.,,:;i1;,,.                                     
                                                ,;;i;::i;1tt1i;:;:;:,,,;tti:i;,,.                                     
                                                ,iii;;,,::iff;;;,.,..,,;i:.,:,,,.                                     
                                        ..,:;i;,:;ii;;:,::::;ii;:,,,,,,...,,,,,.                                      
                                       ,ttfLff;;;;iii;;;::::::::::,,,,,....,,,,,,.                                    
                                      ,itttt1i:ii;;iii;;;;;:::::,,,,,,......,..,:;:. .....                            
                             .,:;:::;;i11itt1i;i1;;ii11iii;::::,,,,,.......:t, ..,;:....  ..                          
                        ...,,,,:i;;;;;i1t1ft1ii;i;;;;i1111ii;:::,,,,,...,..tL, .;:.:. .........                       
                  .....,,,,,::;;;i;;;;i1ffft1iii;i;:;;ii11111ii;;:;;;:::,.,Lf,  ,i:,,.......... ..    .               
               .,,,,,,::::::;;;;ii;;;;ii1fttiiiii;1;:::;ii111111111ii;,...1C1,   :;,:,.,..........    ..              
            .,::::::::::;;;;:;;iii;;;;;;itttiiiii;;1i:::::;;iiiiii;:,....,CL1,   ,,,;..,,.,,......... ..              
           .:;;:::;;::::;:;::::;;;;;;;;;;111iiiiii;:i;::::::::::::,,.....tCti.    .:i..,,,,..,,.......,.  ..          
          .:::::;:::;::::::;:;;::;;;;;;::i111;iii;;;:;;::::::::::::,,,..;Cf1i.    .ii..,,,..,:,......,:...            
          ,::::::;::::::::::;::;;::;;;:::;111;i;ii;;;::::::::::::::,,..:LCti;     .1;..,,,.,::.......::....           
         ,:;;:::::;:::::::;:::::;;:::;;::;111;;i;;;;;:;;::::::,,,,,,,,:fLti;i1,   .1; .,,..,:,......,;,.,..   .       
        ::::;:,,:::;:,:::::;::::::;:::::::i1t;:i;;;;;tCL;::::::::::,,;t1ii;:1CCf: .t: .,,,,:,......,::.,,..  .        
       ,;:,:;;:,,,,:;::::::;i:::::::::::::itti:::;;1LLffft;,,:::::::i1;;ii;:itffi,:t,...,,::,......,::.:;......       
      .;;;:::;;:,,:,:;::::,:ii::::::::::::;tf1,,:i11tffffffti:::::;1t::;;;;;i11;:;11,....::,......,::,.i:.,.....      
      :;;;:,:::;:,,,,:;:,::,;1;,:::::::::::111;;itt;;iiiiii1t11;:;t1:,,::;;iii:,,;1;....,::,.....,,::.:i.,,. ...      
     .;;;;;:,:::::,,,,:;:::,,it:,::::::::::;i;;iiii;:::::;;;;:;i1ti:,,::;;i;;:,.,;;:....,:,....,,,,:,.;,,,,.......    
     :;;;;;;::;:::::,,:;;,::,:t1,,::::::::::;;:::;ii:,::::::;:,,t1:::::::;;:,...,:;,...,,,.....,,,,,,.,,,,,........   
    ,;:;;;;;;::;;::;:,,:;:::::if;,:,,:::::,:;;::::;i;:,,,,,,,,:ii,:,,,,,::,,,..,:;,....,,,....,,,,,,..,::,.........   
    :;:;;;;;:;::;;::::,:i::::::t1,,,,:::,,::;::::::;;:,.......;1..,,,,,,,:,,...,::,....,,.....,,,,,,.,::,,..........  
   .;;::::;;;;;:::;:::::;i:::;;1f:,,,::::::,:::,,,:;;;:,....,,1;.,,,,,,,,,,...,::,....,,.....,,,,,,.,:,,,...........  
   :;;::::::::;;;:,::::::;;;;1iifi,,,,,::::,:::,,,,:;;:,...,,,i,....,,,,,,,...,::....,,.....,,,,,,,.::,,...........   
  ,;;;,::::::::::;:,,:::::::1fiif1,,,,,::;:,,::,,,,:;;::,,,,,:;.,,..,,,,,,...,;;,....,......,,,,,,.:;:,,............  
  ::;:,,,:::::::::::,,,::::,ttiitt:,,,:::;:,,:,,,,,::;::,..,,;;.,,,.,,,,,,..,:;:....,,.....,:::,,.,i;:,.............  
 ,;:;:,,,,::::,,:::::,,,,:::;ft1tf;,,,::;;:,,,,,,,,::;::,,.,.::.,...,,,,,,,,:;;,..,,.....,,,::,,..;i;:,.........,...  
1;:;;:,::,,,::,,,,::::,,:::;;ffttf;,,,::;;;,,,,,,,,::;::,,,,.,:.....,,,,,,,,;i:,,,,,,,,,...,,....,1i:,..........,,..  
i::;;:,:::,,:,,,,,,::::,,:::;LLfff:,,,::;i;:,,,,,,,::;:,,,,,,,,.,,,,,:,,,,,;i;,.,,.,,,,,,..,,....1ti,,,,.........,,...
:::;;:,,,,,::,,,,,,,,::,,,;:,1LfLt::,:::ii;:,,,,,,,:;::,,,.,,:,,..,,,,,,,,:i;:,,,,.,,,......,...;f1:,,............,...
:::;;,,,,,,:,,,,,,,,,,,,,,:::;ffL1:::::;ii;:,,,,,,,:;;,,,,..,;,,. ,,,,,,,:;i:,,,,,,,,,.....,....tf;,,................ 

**/