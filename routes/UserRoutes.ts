import { Router } from 'express'
import { randomUUID } from 'crypto'
import { readFileSync, writeFileSync } from 'fs'
import dbJson from '../server.json'
import path from 'path'

type User = {
    id: string
    name: string
    age: number
}

// interface ICreateUserDTO{
//     name: string
//     age: number
// }

type CreateUserDTO = Omit<User, 'id'>
const dbJsonPath = path.resolve(process.cwd(), 'server.json')
// const dbJson = readFileSync(dbJsonPath)
// const users: User[] = JSON.parse(dbJson.toString()).users
const users: User[] = (dbJson.users as any[]).filter((u): u is User => {
    return (
        typeof u.id === 'string' &&
        typeof u.name === 'string' &&
        typeof u.age === 'number'
    )
})
console.log(users)
const userRoutes = Router()

userRoutes.get('/api/users', (req, res) => {
    res.send(users)
})

userRoutes.post('/api/users', (req, res) => {
    const {name, age}: CreateUserDTO = req.body

    if(!name || !age || Number(age) < 0){
        const errMessage = 'O usuário a ser criado precisa de nome e idade'
        res.status(400).send(errMessage)
    }

    const user = {id: randomUUID(), name, age}

    users.push(user)

    writeFileSync(dbJsonPath, JSON.stringify({...dbJson, users}))

    res.status(201).send(user)
})

userRoutes.delete('/api/users/:id', (req, res) => {
    const { id } = req.params

    if(!id){
        const errMessage = 'O usuário a ser deletado precisa de um id'
        res.status(400).send(errMessage)
    }

    const foundUser = users.find(user => user.id === id)

    if (!foundUser){
        const errMessage = `Usuário com o id ${id} não foi encontrado`
        res.status(400).send(errMessage)
    }

    const updateUsers = users.filter(user => user.id !== id)

    writeFileSync(dbJsonPath, JSON.stringify({...dbJson, users: updateUsers}))

    res.status(204).json()

})

export {userRoutes}