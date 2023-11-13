
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'msg'

export const messsageService = {
    query,
    getById,
    save,
    remove,
    getEmptyMessage,
    getDefaultFilter
}
window.cs = messsageService

_createMsgs()

async function query(filterBy = { txt: '', email: '' }) {
    let msgs = await storageService.query(STORAGE_KEY)
    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        msgs = msgs.filter(msg => regex.test(msg.txt) || regex.test(msg.email))
    }
    return msgs
}

function getById(msgId) {
    return storageService.get(STORAGE_KEY, msgId)
}

async function remove(msgId) {
    await storageService.remove(STORAGE_KEY, msgId)
}

async function save(msg) {
    var savedMessage
    if (msg._id) {
        savedMessage = await storageService.put(STORAGE_KEY, msg)
    } else {
        savedMessage = await storageService.post(STORAGE_KEY, msg)
    }
    return savedMessage
}


function getEmptyMessage() {
    return {
       txt: '', email: ''
    }
}

function _createMsgs() {
    let msgs = utilService.loadFromStorage(STORAGE_KEY)
    if (!msgs || !msgs.length) {
        msgs = [
            {txt: 'nice!!', email: 'tzvia.izhakov@gmail.com'},
            {txt: 'you are welcome', email : 'razamsalem@gmail.com'}
        ]
        utilService.saveToStorage(STORAGE_KEY, msgs)
    }
}

export function getDefaultFilter() {
    return { txt:'', email:''}
}




