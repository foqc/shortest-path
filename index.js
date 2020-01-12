const words = new Set(['BUT', 'CUT', 'RAT', 'BAT', 'WEB', 'CAT', 'COT', 'COG', 'COW', 'DOG'])

const start = 'CAT'
const target = 'DOG'

class Ladder {
    constructor(path, lastWord) {
        this._path = path
        this._lastWord = lastWord
    }
    get path() {
        return this._path
    }
    get lastWord() {
        return this._lastWord
    }
}

function differByOne(word, target) {
    if (word.length !== target.length) return false
    let diffCount = 0
    for (let i = 0; i < word.length; i++) {
        if (target.charAt(i) !== word.charAt(i))
            diffCount++
    }
    return diffCount === 1
}

function checkWords(words, start, target) {

    if (!words.has(start) || !words.has(target)) return null

    const queue = [];
    const path = [];
    path.push(start)
    queue.push(path)
    words.delete(start)
    while (queue.length) {
        const lastPath = queue.pop()
        const lastWord = lastPath[lastPath.length - 1]
        if (target == lastWord)
            return lastPath

        for (let item of words) {
            if (differByOne(item, lastWord)) {
                const listPath = [...lastPath]
                listPath.push(item)
                queue.push(listPath)
                words.delete(item)
            }
        }
    }

    if (!!queue.length)
        return queue.shift()

    return null;
}

console.log(checkWords(words, start, target))
