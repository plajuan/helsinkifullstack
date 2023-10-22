import axios from "axios";
const url = 'http://localhost:3001/persons';

const getAll = () => { return axios.get(url) }

const newPerson = (person) => { return axios.post(url, person); }

const delPerson = (personId) => {     
    const delUrl = url + "/" + personId;
    return axios.delete(delUrl);
}

const updatePersonPhone = (id, number) => { return axios.put(`${url}/${id}`, number) }

export default{
    getAll: getAll,
    newPerson: newPerson,
    delPerson: delPerson,
    updatePersonPhone: updatePersonPhone
}
