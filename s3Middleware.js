const AWS = require('aws-sdk')
const lambdaMiddleware = require('wam-lambda-middleware')
const getObjectContentCache = require('wam-cache-middleware').getObjectContent
const putObjectContentCache = require('wam-cache-middleware').putObjectContent
const removeObjectContentCache = require('wam-cache-middleware').removeObjectContent

const region = lambdaMiddleware.getEnv('AWS_S3_Region')
const accessKeyId = lambdaMiddleware.getEnv('AWS_S3_PublicKey')
const secretAccessKey = lambdaMiddleware.getEnv('AWS_S3_PrivateKey')

AWS.config.update({ region, accessKeyId, secretAccessKey })

const S3 = new AWS.S3()
const Bucket = lambdaMiddleware.getEnv('AWS_S3_Bucket')

const getObjectContent = async (Key, onlyCache = false) => {
  try {
    if (onlyCache) {
      const ok = true
      const content = getObjectContentCache(Key)
      const err = false
      return { ok, content, err }
    }

    const objectContentCache = getObjectContentCache(Key)
    if (objectContentCache.length > 0) {
      const ok = true
      const content = objectContentCache
      const err = false
      return { ok, content, err }
    }

    const params = { Bucket, Key }
    const data = await S3.getObject(params).promise()
    const content = data.Body.toString('utf-8')
    const err = false
    const ok = true
    return { ok, content, err }
  }
  catch (err) {
    const content = ''
    const ok = false
    return { ok, content, err }
  }
}

const putObjectContent = async (Key, Body, onlyCache = false, ContentType = 'application/json') => {
  try {
    if (Body.length == 0) {
      const ok = true
      const err = false
      return { ok, err }
    }

    if (onlyCache) {
      putObjectContentCache(Key, Body)
      const ok = true
      const err = false
      return { ok, err }
    }

    await S3.putObject({ Body, Bucket, ContentType, Key }).promise()
    const err = falses
    const ok = true
    return { ok, err }
  }
  catch (err) {
    const ok = false
    return { ok, err }
  }
}

const exists = async (Key, precision = true) => {
  try {
    const params = { Bucket, Key }
    return await S3.headObject(params)
      .promise()
      .then(() => true)
      .catch((err) => {
        if (err.code == 'Forbidden') {
          return false
        }
        return precision
      })
  } catch (err) {
    console.log(err)
    return precision
  }
}

module.exports = { getObjectContent, putObjectContent, removeObjectContentCache, exists }
