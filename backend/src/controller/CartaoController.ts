import { getRepository } from "typeorm"
import { Cartao } from "../entity/Cartao"
import { Request, Response } from "express"

export const getCartoes = async (request: Request, response: Response) => {
 try {
  const cartoes = await getRepository(Cartao).find()
  return response.json(cartoes)
 }
 catch {
  console.log('Deu erro no getCartoes')
 }
}

export const saveCartoes = async (request: Request, response: Response) => {
 const cartoes = await getRepository(Cartao).save(request.body)
 return response.json(cartoes)
}

export const getCartao = async (request: Request, response: Response) => {
 const { id } = request.params
 const cartoes = await getRepository(Cartao).findOne(id)
 return response.json(cartoes)
}

export const updateCartao = async (request: Request, response: Response) => {
 const { id } = request.params

 const cartoes = await getRepository(Cartao).update(id, request.body)

 if (cartoes.affected === 1) {
  const cartoesUpdated = await getRepository(Cartao).findOne(id)
  return response.json(cartoesUpdated)
 }

 return response.status(404).json({ message: 'Cartões not found!' })
}

export const removeCartao = async (request: Request, response: Response) => {
 const { id } = request.params

 const cartoes = await getRepository(Cartao).delete(id)

 if (cartoes.affected === 1) {
  const cartoesUpdated = await getRepository(Cartao).findOne(id)
  return response.json({ message: 'Cartões removed!' })
 }

 return response.status(404).json({ message: 'Cartões not found!' })
}

