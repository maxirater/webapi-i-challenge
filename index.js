const express = require( 'express' )
const db = require( './data/db.js' )

const server = express()
server.use( express.json() )

server.listen( 4000, () => {
    console.log( "\nserver running on port 4000" )
} )

server.get( '/', ( req, res ) => {
    res.send( "hey there" )
} )

server.get( '/api/users', ( req, res ) => {
    const users = db.find()
        .then( pulledUsers => {
            res.status( 200 ).json( pulledUsers )
        } )
        .catch( err => {
            res.status( 500 ).json( { sucess: false, message: "The users information could not be retrieved." } )
        } )
} )

server.get('/api/users/:id', (req,res) => {
    const id = req.params.id
    db.findById(id)
    .then(oneUser => {
        if(oneUser.id === id){
            res.status(200).json({success: true, oneUser})
        }else{
            res.status(500).json({success: false, message: "The user information could not be retrieved."})
        }
        
    })
    .catch(err => {
        res.status(404).json({success: false, message: "The user information could not be retrieved."})
    })
})

server.delete('/api/users/:id', (req,res)=>{
    const id = req.params.id
    db.remove(id)
    .then(() => {
        if(oneUser.id === id){
            res.status(204).end()
        }else{
            res.status(404).json({success: false, message: "The user with the specified ID does not exist."})
        }
    })
    .catch(err => {
        res.status(500).json({success: false, message: err.message})
    })
})

server.post('/api/users/', (req,res) => {
    const newUser = req.body

    db.insert(newUser)
    .then(newUserObj => {
        if(newUserObj.name && newUserObj.bio){
            res.status(201).json({success: true, newUserObj})
        }else{
            res.status(500).json({
                success:false, message: "Please provide name and bio for the user."
            })
        }
    })
    .catch(err => {
        res.status(err.code).json({success: false, message: err.message})
    })
})

server.put('/api/users/:id', (req,res)=>{
    const changeUser = req.body
    const id = req.params.id

    db.update(id, changeUser)
    .then(updatedUser => {
        if(updatedUser.id === id){
            res.status(201).json({success: true, count})
        }else {
            res.status(500).json({success: false, message: "The user with the specified ID does not exist."})
        }
        if (updatedUser.name && updatedUser.bio){
            res.status(201).json({success: true, count})
        }else{
            res.status(500).json({success: false, message: "Please provide name and bio for the user."})
        }
        
    })
    .catch(err => {
        res.status(500).json({success: false, message: err.message})
    })
})
