export function copyObjectArray(array) {
    const newArray = []
    array.forEach((e) => {
        newArray.push({...e})
    })
    return newArray
}