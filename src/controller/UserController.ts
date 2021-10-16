import { Request, Response } from "express"
import { User } from "../entity/user"

import { getRepository } from "typeorm"

import UserService from "../services/UserService"

export const getUsers = async (req: Request, res: Response): Promise<Response> => {

    const results = await getRepository(User).find();

    return res.json(results)
}

export const getUser = async (req: Request, res: Response): Promise<Response> => {
    const result = await getRepository(User).findOne({where: {username: req.params.username}});

    if(result) return res.json(result)

    return res.json("Usuario não encontrado")
}

export const createUser = async (req: Request, res: Response): Promise<Response> => {
    var {username, password} = req.body
    const user = new UserService()

    const checkUserExists = await getRepository(User).findOne({where: {username}});

    if(!checkUserExists){
        if(user.maximumLetter(username)){
            var passwordCript = await user.criptPassword(password)
    
            const newUser = getRepository(User).create({username, password: passwordCript})
            await getRepository(User).save(newUser)
    
            return res.json(`Usuário criado`)
        }

        return res.json("O nome de usuário é muito grande")
    }

    return res.json("O nome de usuário já está em uso")
}

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
    var {username, password} = req.body
    const userUpdate = await getRepository(User).findOne({where: {username: req.params.username}});

    const user = new UserService()
    
    if(userUpdate){
        var passwordCript = await user.criptPassword(password)
        getRepository(User).merge(userUpdate, {username, password: passwordCript})
        await getRepository(User).save(userUpdate)
        return res.json(`Usuário atualizado`)
    }

    return res.json("Usuario não encontrado")
}

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    const user = await getRepository(User).delete({username: req.params.username})

    if(user.affected) return res.json("Usuario excluido")
    
    return res.json("Usuario não encontrado")
}