import { getRepository } from "typeorm"
import { Tarefas } from "../entity/Tarefas"
import { Request, Response } from "express"

export const getTarefas = async (request: Request, response: Response) => {
 try {
  const tarefas = await getRepository(Tarefas).find()
  return response.json(tarefas)
 }
 catch {
  console.log('Deu erro no getTarefas')
 }
}

export const saveTarefas = async (request: Request, response: Response) => {
 const tarefas = await getRepository(Tarefas).save(request.body)
 return response.json(tarefas)
}

export const getTarefa = async (request: Request, response: Response) => {
 const { id } = request.params
 const tarefa = await getRepository(Tarefas).findOne(id)
 return response.json(tarefa)
}

export const updateTarefa = async (request: Request, response: Response) => {
 const { id } = request.params

 const tarefa = await getRepository(Tarefas).update(id, request.body)

 if (tarefa.affected === 1) {
  const tarefaUpdated = await getRepository(Tarefas).findOne(id)
  return response.json(tarefaUpdated)
 }

 return response.status(404).json({ message: 'Tarefa not found!' })
}

export const removeTarefa = async (request: Request, response: Response) => {
 const { id } = request.params

 const tarefa = await getRepository(Tarefas).delete(id)

 if (tarefa.affected === 1) {
  const tarefaUpdated = await getRepository(Tarefas).findOne(id)
  return response.json({ message: 'Tarefa removed!' })
 }

 return response.status(404).json({ message: 'Tarefa not found!' })
}
