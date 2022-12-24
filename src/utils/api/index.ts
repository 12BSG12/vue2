import { ResUsers, ResJob, ResTodo } from './types';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001/',
});

const createQuery = async <T>(
  query: 'get' | 'post' | 'put' | 'delete',
  url: string,
  body?: object | null,
) => {
  try {
    const _url = url.replace(/\s+/g, '');
    const { data } = await instance[query]<T>(_url, body);
    return data;
  } catch (error) {
    alert(error);
  }
};

export const usersApi = {
  getUsers(search?: string) {
    const q = search ? `?q=${search}` : '';
    const url = `users${q}`;
    return createQuery<ResUsers[]>('get', url);
  },

  editUser(id: number, body: object) {
    const url = `users/${id}`;
    return createQuery<ResUsers>('put', url, body);
  },

  createUser(body: object) {
    const url = 'users';
    return createQuery<ResUsers>('post', url, body);
  },

  delUser(id: number) {
    const url = `users/${id}`;
    return createQuery<ResUsers>('delete', url);
  },
};

export const jobApi = {
  getJobs(search?: string) {
    const q = search ? `?q=${search}` : '';
    const url = `job${q}`;
    return createQuery<ResJob[]>('get', url);
  },

  editJob(id: number, body: object) {
    const url = `job/${id}`;
    return createQuery<ResJob>('put', url, body);
  },

  createJob(body: object) {
    const url = 'job';
    return createQuery<ResJob>('post', url, body);
  },

  delJob(id: number) {
    const url = `job/${id}`;
    return createQuery<ResJob>('delete', url);
  },
};

export const taskApi = {
  getTasks(search?: string) {
    const q = search ? `?q=${search}` : '';
    const url = `todo${q}`;
    return createQuery<ResTodo[]>('get', url);
  },

  editTask(id: number, body: object) {
    const url = `todo/${id}`;
    return createQuery<ResTodo>('put', url, body);
  },

  createTask(body: object) {
    const url = 'todo';
    return createQuery<ResTodo>('post', url, body);
  },

  delTask(id: number) {
    const url = `todo/${id}`;
    return createQuery<ResTodo>('delete', url);
  },
};
