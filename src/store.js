import Vue from 'vue'
import Vuex from 'vuex'
import Organizations from './assets/ZendeskJsons/organizations.json'
import Tickets from './assets/ZendeskJsons/tickets.json'
import Users from './assets/ZendeskJsons/users.json'


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        Organizations: Organizations,
        Tickets: Tickets,
        Users: Users,
        Groups: [
            {
                name: 'Organization',
                items: Organizations
            },
            {
                name: 'Ticket',
                items: Tickets
            },
            {
                name: 'User',
                items: Users
            }
        ]

    },
    mutations: {
        
    },
    actions: {
        
    }
})
