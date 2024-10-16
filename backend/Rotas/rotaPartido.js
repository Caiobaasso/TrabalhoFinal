import { Router } from "express";
import PartidoCtrl from "../Controles/partidoCtrl.js";

const rotaPartido = new Router();
const partCtrl  = new PartidoCtrl();

rotaPartido
.get('/', partCtrl.consultar)
.get('/:termo',partCtrl.consultar)
.post('/', partCtrl.gravar)
.put('/', partCtrl.atualizar)
.delete('/', partCtrl.excluir);

export default rotaPartido;