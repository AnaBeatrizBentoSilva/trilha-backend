const queystring = require('node:querystring')
const url = require('node:url')

const baseUrl = 'https://siteviagem.com.br'
const uri = queystring.stringify({
    destino: 'Rio de Janeiro',
    periodo: 'Verão'
})

const fullUrl = `${baseUrl}/${uri}`
console.log(fullUrl)

const parseUri = queystring.parse(uri)
console.log(uri)
console.log(parseUri)
console.log(parseUri.destino)
console.log(url.parse(fullUrl))

const uri2 = queystring.escape('São Paulo')
console.log(uri2)

const unescapeUri2 = queystring.unescape(uri2)
console.log(unescapeUri2)