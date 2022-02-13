const expect = require("chai").expect
const { getObjectContent, putObjectContent, removeObjectContentCache } = require("../s3Middleware")

describe("S3 Middleware", function () {

    it("Put Object Content", async () => {
        const key = 'hello.json'
        const object = {
            foo: 'bar',
            fizz: 'buzz'
        }
        const objectContent = JSON.stringify(object)
        expect(await putObjectContent(key, objectContent, true)).to.deep.equal({
            ok: true,
            err: false,
        })
    })

    it("Put Clean Object Content", async () => {
        const key = 'hello.json'
        const object = {
            foo: 'bar',
            fizz: 'buzz'
        }
        const objectContent = ``
        expect(await putObjectContent(key, objectContent, true)).to.deep.equal({
            ok: true,
            err: false,
        })
    })

    it("Get Object Content", async () => {
        const key = 'hello.json'
        const object = {
            foo: 'bar',
            fizz: 'buzz'
        }
        const objectContent = JSON.stringify(object)
        expect((await getObjectContent(key)).content).to.equal(objectContent)
    })

    it("Get Remove Object Content", async () => {
        const key = 'hello.json'
        expect(removeObjectContentCache(key)).to.equal(true)
        expect((await getObjectContent(key)).content).to.equal(``)
    })
})
