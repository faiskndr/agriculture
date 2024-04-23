const user = JSON.parse(!sessionStorage.getItem('auth')?null:sessionStorage.getItem('auth'));

export default user;