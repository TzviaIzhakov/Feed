
import { httpService } from './http.service.js'

const STORAGE_KEY = 'msg'

export const messageService = {
    query,
    getById,
    save,
    remove,
    getEmptyMessage,
    getDefaultFilter
}
window.cs = messageService


async function query(filterBy = { txt: '', email: '' }) {
    console.log(filterBy,"filterBy");
    return httpService.get(STORAGE_KEY, filterBy)
}

function getById(msgId) {
    return httpService.get(`msg/${msgId}`)
}

async function remove(msgId) {
    return httpService.delete(`msg/${msgId}`)
}

async function save(msg) {
    let savedMsg
    if (msg._id) {
        savedMsg = await httpService.put(`msg/${msg._id}`, msg)

    } else {
        savedMsg = await httpService.post('msg', msg)
    }
    return savedMsg
}


function getEmptyMessage() {
    return {
       txt: '', email: ''
    }
}

function getDefaultFilter() {
    return { txt:'', email:''}
}




