import Api from './api'
import EventBus from './EventBus'
class Auth {
    constructor() {
        this.user = this.getUserFromStorage();
        EventBus.$on(['users:update', 'users.patch'], (user) => {
            if(user.id === this.getUser()?.id) {
                this.getUserFromApi().then(user =>{
                    this.setUser(user)
                })
            }
        })
    }

    getUserFromApi() {
        return new Promise((resolve, reject) => {
            Api.call('/api/user', 'get').then(res => {
                resolve(res.data)
            },
                reject)
        })
    }

    getUserFromStorage() {
        return localStorage.getItem('User') ? JSON.parse(localStorage.getItem('User')) : false;
    }

    setUserToStorage(user) {
        return localStorage.setItem('User', JSON.stringify(user))
    }

    getUser() {
        return this.user ? this.user : this.getUserFromStorage();
    }

    setUser(user) {
        this.user = user;
        this.setUserToStorage(user);
        return this.user;
    }
}

export default new Auth;
