import express from 'express'
import { PrismaClient } from '@prisma/client'

const app = express()
app.use(express.json())
const prisma = new PrismaClient()

app.post('/user', async (req, res) => {
    
    const { nome, age, favMusic, favArtist } = req.body

    const ifExist = await prisma.user.findFirst({
        where: {
            nome
        }
    })

    if (ifExist) {
        res.status(400).send({
            error: "esse usuario ja existe"
        })
    }

    const person = await prisma.user.create({ 
        data: {
            nome,
            age,
            favMusic,
            favArtist,
        }
    })

    res.status(201).json({ message:'user create!', person })
})

app.get('/user', async (req, res) => {    

    const personList = await prisma.user.findMany()

    res.send(personList)
})

app.get('/user/:id', async (req, res) => {

    const { id } = req.params 

    const ifExistID = await prisma.user.findFirst({
        where: {
            id: parseInt(id)
        }
    })

    if(!ifExistID){
        res.status(400).send({
            erro: 'id nao existe'
        }) 
    } else {

        const person = await prisma.user.findUnique({
            where: {
                    id: parseInt(id)
                }
        })
    
        res.send(person)
    }
})

app.get('/user-delete/:id', async (req, res) => {
    
    const { id } = req.params
    
    const deleteId = await prisma.user.delete({
        where: {
            id: parseInt(id)
        }
    })

    res.status(201).send(`User ${id} deletado.`)
})


app.listen(3333, () => {
    console.log('app rodando na porta 3333')
})