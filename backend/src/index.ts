import "reflect-metadata";
import { createConnection } from 'typeorm';
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from 'cors';
import routes from "./routes";
import { Tarefas } from './entity/Tarefas';
import { Cartao } from './entity/Cartao';
import { Tasks } from './entity/Tasks';

const app = express()
createConnection().then(async connection => {
 const tarefas = new Tarefas();
 tarefas.title = "teste backend"
 tarefas.description = "descricao backend"
 tarefas.labels = {
  id: 1,
  name: "label 1 backend"
 }
 tarefas.data = "22/02/2022"
 tarefas.cartao = new Cartao();

 const cartao = new Cartao();
 cartao.title = "title cartao backend"

 cartao.addTarefa(tarefas)

 const userRepository = connection.getRepository(Cartao);

 await userRepository.save(cartao);

 console.log("Saved a new cartao with id: " + cartao.id);

}).catch(error => console.log(error));

app.use(cors())
app.use(bodyParser.json())
app.use(routes)

app.listen(3333)
