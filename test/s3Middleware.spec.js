const expect = require("chai").expect
const { getObjectContent, putObjectContent, removeObjectContentCache, exists } = require("../s3Middleware")

describe("S3 Middleware", function () {

    it("Put Object Content", async () => {
        const key = "hello.json"
        const object = {
            foo: "bar",
            fizz: "buzz"
        }
        const objectContent = JSON.stringify(object)
        expect(await putObjectContent(key, objectContent, true)).to.deep.equal({
            ok: true,
            err: false,
        })
        expect(await exists(key, true)).to.equal(true)
    })

    it("Put Clean Object Content", async () => {
        const key = "hello.json"
        const objectContent = ``
        expect(await putObjectContent(key, objectContent, true)).to.deep.equal({
            ok: true,
            err: false,
        })
        expect(await exists(key, true)).to.equal(true)
    })

    it("Get Object Content", async () => {
        const key = "hello.json"
        const object = {
            foo: "bar",
            fizz: "buzz"
        }
        const objectContent = JSON.stringify(object)
        expect((await getObjectContent(key)).content).to.equal(objectContent)
    })

    it("Get Object Content Only Cache", async () => {
        const key = "hello.json"
        const object = {
            foo: "bar",
            fizz: "buzz"
        }
        const objectContent = JSON.stringify(object)
        expect((await getObjectContent(key, true)).content).to.equal(objectContent)
    })

    it("Get Removed Object Content", async () => {
        const key = "hello.json"
        expect(removeObjectContentCache(key)).to.equal(true)
        expect((await getObjectContent(key)).content).to.equal(``)
        expect(await exists(key, true)).to.equal(false)
    })
})
