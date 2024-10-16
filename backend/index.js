import express from "express";
import rotaPartido from "./Rotas/rotaPartido.js";
import cors from "cors";


const host = '0.0.0.0';
const porta = '4000';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/partidos',rotaPartido);

app.listen(porta, host, () => {
    console.log(`Servidor iniciado em http://${host}:${porta}`);
});