const crypto = require('crypto')

function base64UrlEncode(str) {
  let base64 = Buffer.from(str).toString('base64')
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
}

function createJWT(payload, expiresIn) {
  const header = {
    alg: 'HS256',
    typ: 'JWT',
  }

  const issuedAt = Math.floor(Date.now() / 1000) // Issued at timestamp in seconds
  const expirationTime = issuedAt + expiresIn // Expiration time in seconds

  const updatedPayload = {
    ...payload,
    iat: issuedAt,
    exp: expirationTime,
  }

  const encodedHeader = base64UrlEncode(JSON.stringify(header))
  const encodedPayload = base64UrlEncode(JSON.stringify(updatedPayload))

  const signature = crypto.createHmac('sha256', Bun.env.JWT_KEY).update(`${encodedHeader}.${encodedPayload}`).digest('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')

  return `${encodedHeader}.${encodedPayload}.${signature}`
}

function verifyJWT(jwt) {
  if(jwt)
    const [encodedHeader, encodedPayload, receivedSignature] = jwt.split('.')
  
    const signature = crypto.createHmac('sha256', Bun.env.JWT_KEY).update(`${encodedHeader}.${encodedPayload}`).digest('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
  
    const decodedPayload = JSON.parse(Buffer.from(encodedPayload, 'base64').toString('utf-8'))
  
    const currentTimestamp = Math.floor(Date.now() / 1000)
  
    if (signature === receivedSignature && decodedPayload.exp >= currentTimestamp) {
      return decodedPayload
    } else {
      return null
    }
  }
}

module.exports = {
  createJWT,
  verifyJWT,
}
