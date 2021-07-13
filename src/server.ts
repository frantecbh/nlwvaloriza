import express from 'express'

const app = express()

app.get('/test', (request, response) =>{
    return response.send("Ola Nlw")
})

app.post('/test-post', (request, response) =>{
    return response.send("Ola Nlw")
})



app.listen(3333, () =>{
    console.log("Server on port 3333")
})