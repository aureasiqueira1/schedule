import { getRepository } from "typeorm"
import { Tasks } from "../entity/Tasks"
import { Request, Response } from "express"

export const getTasks = async (request: Request, response: Response) => {
 try {
  const task = await getRepository(Tasks).find()
  return response.json(task)
 }
 catch {
  console.log('Deu erro no getTasks')
 }
}

export const saveTasks = async (request: Request, response: Response) => {
 const task = await getRepository(Tasks).save(request.body)
 return response.json(task)
}

export const getTask = async (request: Request, response: Response) => {
 const { id } = request.params
 const task = await getRepository(Tasks).findOne(id)
 return response.json(task)
}

export const updateTask = async (request: Request, response: Response) => {
 const { id } = request.params

 const task = await getRepository(Tasks).update(id, request.body)

 if (task.affected === 1) {
  const taskUpdated = await getRepository(Tasks).findOne(id)
  return response.json(taskUpdated)
 }

 return response.status(404).json({ message: 'Task not found!' })
}

export const removeTask = async (request: Request, response: Response) => {
 const { id } = request.params

 const task = await getRepository(Tasks).delete(id)

 if (task.affected === 1) {
  const taskUpdated = await getRepository(Tasks).findOne(id)
  return response.json({ message: 'Task removed!' })
 }

 return response.status(404).json({ message: 'Task not found!' })
}

