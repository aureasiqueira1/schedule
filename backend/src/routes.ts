import { Router, Request, Response } from 'express'
import { getTarefas, saveTarefas, getTarefa, updateTarefa, removeTarefa } from './controller/TarefasController';
import { getCartoes, saveCartoes, getCartao, updateCartao, removeCartao } from './controller/CartaoController';
import { getTasks, saveTasks, getTask, updateTask, removeTask } from './controller/TasksController';

//import { getRotinas, saveRotina, getRotina, updateRotina, finishedRotina, removeRotina } from './controller/RotinaController'

const routes = Router()

try {
    routes.get('/', (request: Request, response: Response) => {
        return response.json({ message: 'Hello World!' })
    })
}
catch {
    console.log('Deu erro no router!')
}


routes.get('/tarefas', getTarefas)
routes.post('/tarefas', saveTarefas)
routes.get('/tarefas/:id', getTarefa)
routes.put('/tarefas/:id', updateTarefa)
routes.delete('/tarefas/:id', removeTarefa)

routes.get('/cartoes', getCartoes)
routes.post('/cartoes', saveCartoes)
routes.get('/cartoes/:id', getCartao)
routes.put('/cartoes/:id', updateCartao)
routes.delete('/cartoes/:id', removeCartao)

routes.get('/tasks', getTasks)
routes.post('/tasks', saveTasks)
routes.get('/tasks/:id', getTask)
routes.put('/tasks/:id', updateTask)
routes.delete('/tasks/:id', removeTask)

export default routes