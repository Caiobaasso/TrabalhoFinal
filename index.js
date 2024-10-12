import express from 'express';
import session from 'express-session';

const host = '0.0.0.0';
const port = 3000;
const app = express ();

app.use(express.static('./publico'));
app.use(express.static('./privado'));

app.listen(port,host, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});