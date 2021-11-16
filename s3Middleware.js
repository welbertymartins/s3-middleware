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
    const ok = true
    return { ok, content }
  } 
  catch (e) 
  {
    const ok = false
    const content = ""
    return { ok, content }
  }
}

const putObject = async(Key, Body, ContentType = 'application/json') => {
  try 
  { 
    await S3.putObject({ Body, Bucket, ContentType, Key }).promise()
    return true
  } 
  catch (e) 
  {
    return false 
  }
}

module.exports = { getObjectContent, putObject }