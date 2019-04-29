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
            res.status( err.code ).json( { message: 'error retreiving users' } )
        } )
} )

server.get('/api/users/:id', (req,res) => {
    const id = req.params.id
    db.findById(id)
    .then(oneUser => {
        res.status(201).json({success: true, oneUser})
    })
    .catch(err => {
        res.status(err.code).json({success: false, message: err.message})
    })
})

server.delete('/api/users/:id', (req,res)=>{
    const id = req.params.id
    db.remove(id)
    .then(() => {
        res.status(204).end()
    })
    .catch(err => {
        res.status(err.code).json({success: false, message: err.message})
    })
})

server.post('/api/users/', (req,res) => {
    const newUser = req.body

    db.insert(newUser)
    .then(newUserObj => {
        res.status(201).json({success: true, newUserObj})
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
        res.status(201).json({success: true, count})
    })
    .catch(err => {
        res.status(err.code).json({success: false, message: err.message})
    })
})
