const { Router } = require('express')

const router = require('express').Router()

const Person = require('../models/Person')


router.post('/', async (req,res) => {

    const {name, salary, approved, cpf} = req.body

    if(!name){
        res.status(422).json({error: 'O nome é obrigatório!'})
        return 
    }
    const person = {
        name,
        salary,
        approved,
        cpf,
    }
    try{
        await Person.create(person)
        res.status(201).json({message: 'Pessoa cadastrada com sucesso'})
    } catch(error){
        res.status(500).json({error: error})
    }
})

router.get('/', async (req, res) => {

    try{
        const people = await Person.find()

        res.status(200).json(people)

    }catch(error){
        res.status(500).json({error: error})
    }   
})

router.get('/:id', async(req, res) =>{
    console.log(req)

    const id = req.params.id

    try{
        const person = await Person.findOne({_id: id})
        
        if(!person){
            res.status(422).json({message: 'O usuário não foi encontrado!'})
            return
        }

        res.status(200).json(person)
        

    }catch(error){
        res.status(500).json({error: error})
    }

})

router.patch('/:id', async (req, res) =>{
    const id = req.params.id

    const {name, salary, approved, cpf} = req.body

    const person = {
        name, 
        salary,
        approved,
        cpf,
    }

    try{

        const updatePerson = await Person.updateOne({_id: id}, person)

        if(updatePerson.matchedCount === 0){
            res.status(422).json({message:'Usuário não existe.'})
            return
        }
        
        res.status(200).json(person)
        

    }catch(error){
        res.status(500).json({error: error})
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id

    const person = await Person.findOne({_id: id})
    if (!person){
        res.status(422).json({message: 'Usuario nao existe'})
        return
    }

    try{
        await Person.deleteOne({_id: id})

        res.status(200).json({message: 'Usuário removido com sucesso'})

    }catch(error){
        res.status(500).json({error: error})


    }
})

module.exports = Router 