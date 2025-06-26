const http = require('http')

const sports = ['soccer', 'volley', 'basktball', 'tennis']

const server = http.createServer(async (request, response) => {
    const { method, statusCode, url } = request

    request.headers.accept = '*'
    request.headers.allow = '*'

    const bodyPromise = new Promise((resolve, reject) => {
        let body
        request.on('data', data => {
            body = JSON.parse(data)
        })
        request.on('end', data => {
            resolve(body)
        })
    })

    if(url === '/'){
        response.write('<div><h1>Hello from node</h1><p>http server</p></div>')
        response.end()
        return
    }

    if(url === '/api/sports'){
        if(method === 'GET'){
            response.write(JSON.stringify(sports))
            response.end()
            return
        }

        if(method === 'POST'){
            const body = await bodyPromise
            const {name} = body
            if(!sports.map(sports => sports.toLowerCase()).includes(name.toLowerCase())){
                sports.push(name.toLowerCase())
                console.log('Enter')
            }
            response.write(name.toLowerCase())
            response.end()
            return
        }
    }

    response.statusCode = 404
    response.write('<h1>Página não encontrada</h1>')
    response.end()
    return
})

server.listen(3002, 'localhost', () => {
    console.log('Server running on http://localhost:3002')
})