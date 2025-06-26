const crypto = require('node:crypto')

const chave = crypto.randomBytes(12)
console.log(chave)

const chaveHex = crypto.randomBytes(12).toString('hex')
console.log(chaveHex)

const chaveBase64 = crypto.randomBytes(12).toString('base64')
console.log(chaveBase64)

const uuid = crypto.randomUUID()
console.log(uuid)

const {primaryKey, publicKey} = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048
})
console.log(primaryKey)
console.log(publicKey)
