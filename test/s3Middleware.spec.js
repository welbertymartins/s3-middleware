const expect = require("chai").expect
const { putObjectContentCache, getObjectContent, removeObjectContentCache } = require("../s3Middleware")

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

    it("Get Remove Object Content", async() => {
        const key = 'hello.json'
        expect(removeObjectContentCache(key)).to.equal(true)
        expect((await getObjectContent(key)).content).to.equal(``)
    })
})
