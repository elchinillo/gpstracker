import express from 'express';
import path from 'path';

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/', express.static(path.join(__dirname, 'html')));

const TCP_PORT = process.env.PORT || 5000;

app.listen(TCP_PORT, () => {
    console.log(`Ecirgas app listening on port ${TCP_PORT}!`);
});
