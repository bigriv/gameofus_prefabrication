export function newObject(object) {
    return JSON.parse(JSON.stringify(object))
}