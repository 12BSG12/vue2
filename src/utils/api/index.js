import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001/',
});

const createQuery = async (method, query, search, id = '', body = null) => {
  const q = search ? `?q=${search}` : '';
  const url = String(query + id + q).replace(/\s+/g, '');
  const { data } = await instance[method](url, body);
  return data;
};

export const usersApi = {
  getUsers: (search) => createQuery('get', 'users', search),

  editUser: (id, body) => createQuery('put', 'users/', '', id, body),

  createUser: (body) => createQuery('post', 'users', '', '', body),

  delUser: (id) => createQuery('delete', 'users/', '', id),
};

export const jobApi = {
  getJobs: (search) => createQuery('get', 'job', search),

  editJob: (id, body) => createQuery('put', 'job/', '', id, body),

  createJob: (body) => createQuery('post', 'job', '', '', body),

  delJob: (id) => createQuery('delete', 'job/', '', id),

};

export const taskApi = {
  getTasks: (search) => createQuery('get', 'todo', search),

  editTask: (id, body) => createQuery('put', 'todo/', '', id, body),

  createTask: (body) => createQuery('post', 'todo', '', '', body),

  delTask: (id) => createQuery('delete', 'todo/', '', id),
};
