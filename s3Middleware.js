const AWS = require("aws-sdk")
const lambdaMiddleware = require("./lambdaMiddleware")

const region = lambdaMiddleware.getEnv("AWS_S3_Region")
const accessKeyId = lambdaMiddleware.getEnv("AWS_S3_PublicKey")
const secretAccessKey = lambdaMiddleware.getEnv("AWS_S3_PrivateKey")

AWS.config.update({ region, accessKeyId, secretAccessKey })

const S3 = new AWS.S3()
const Bucket = lambdaMiddleware.getEnv("AWS_S3_Bucket")

const getObjectContent = async(Key) => {
  try 
  {
    const params = { Bucket, Key }
    const data = await S3.getObject(params).promise()
    const content = data.Body.toString("utf-8")
    const err = {}
    const ok = true
    return { ok, content, err }
  } 
  catch (err) 
  {
    const content = ""
    const ok = false
    return { ok, content, err }
  }
}

const putObjectContent = async(Key, Body, ContentType = "application/json") => {
  try 
  { 
    await S3.putObject({ Body, Bucket, ContentType, Key }).promise()
    const err = {}
    const ok = true
    return { ok, err }
  } 
  catch (err) 
  {
    const ok = false
    return { ok, err }
  }
}

module.exports = { getObjectContent, putObjectContent }