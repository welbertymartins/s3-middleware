const AWS = require('aws-sdk')
const context = require('./context')

AWS.config.update({
  region: context.getEnv('AWS_S3_Region'),
  "accessKeyId": context.getEnv('AWS_S3_PublicKey'), 
  "secretAccessKey": context.getEnv('AWS_S3_PrivateKey')
});

const S3 = new AWS.S3()
const Bucket = context.getEnv('AWS_S3_Bucket')

const getObjectContent = async(Key) => {
  try 
  {
    const params = { Bucket, Key }
    const data = await S3.getObject(params).promise()
    const content = data.Body.toString('utf-8')
    const err = {}
    const ok = true
    return { ok, content, err }
  } 
  catch (err) 
  {
    const ok = false
    const content = ""
    return { ok, content, err }
  }
}

const putObject = async(Key, Body, ContentType = 'application/json') => {
  try 
  { 
    await S3.putObject({ Body, Bucket, ContentType, Key }).promise()
    const ok = true
    const err = {}
    return { ok, err }
  } 
  catch (err) 
  {
    const ok = false
    return { ok, err }
  }
}

module.exports = { getObjectContent, putObject }