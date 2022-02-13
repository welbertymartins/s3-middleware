const expect = require("chai").expect
const { putObjectContentCache, getObjectContent } = require("../s3Middleware")

describe("S3 Middleware", function() {

    it("Put Object Content", function () {
        const key = 'hello.json'
        const object = {
            foo: 'bar',
            fizz: 'buzz'
        }
        const objectContent = JSON.stringify(object)
        expect(putObjectContentCache(key, objectContent)).to.equal(true)
    })

    it("Get Object Content", async() => {
        const key = 'hello.json'
        const object = {
            foo: 'bar',
            fizz: 'buzz'
        }
        const objectContent = JSON.stringify(object)
        expect((await getObjectContent(key)).content).to.equal(objectContent)
    })
})
