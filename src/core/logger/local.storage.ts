import { AsyncLocalStorage } from 'async_hooks';
const localStorage = new AsyncLocalStorage();
export default localStorage;
