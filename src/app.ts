import express  from 'express';
var app = express();

app.use(express.json());
app.get('/ping', async (req: Request, res: Response): Promise<any> => res.json("pong"))


app.listen(3000, function () {
    console.log('Server listening on port 3000!');
});
