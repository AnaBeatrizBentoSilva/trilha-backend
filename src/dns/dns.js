const { error } = require('node:console')
const dns = require('node:dns')

const searchUrl = 'google.com'

dns.resolve4(searchUrl, (err, addresses) => {
    if(err){
        console.log('Url não encontrada')
        return
    }
    console.log(addresses)
})

async function bootstrap() {
    const searchUrl = 'google.com'

    console.time('Pesquisando url por DNS padrão')
    const addresses = await dns.promises.resolve4(searchUrl)
    console.timeEnd('Pesquisando url por DNS padrão')
    console.log(addresses)
    
    const nameServers = await dns.promises.resolveNs(searchUrl)
    console.log(nameServers)

    const ipNs = await dns.promises.resolve4(nameServers[1])

    const resolver = new dns.Resolver()
    resolver.setServers(ipNs)
    console.time('Pesquisando url por DNS específico')
    resolver.resolve4(searchUrl, (error, addresses) =>{
        if(error){
            console.error('Não foi possível encotrar ipv4')
        }
        console.timeEnd('Pesquisando url por DNS específico')
        console.log(addresses)
    })

}

bootstrap()