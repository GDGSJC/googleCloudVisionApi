app.use(express.bodyParser());


app.use(bodyParser.json({limit: "50mb"}));

app.post('/', function(request, response){
    console.log(request);
});