import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        Groups: [
            {
                name: 'Vehicles',
                items: [
                    { make: 'Nissan', model: 'Altima', year: '2010', miles: 200000},
                    { make: 'Ford', model: 'Fusion', year: null, miles: 10000},
                    { make: 'Lamborghini', model: 'Gallardo', year: '2006', newCar: true}
                ]
            },
            {
                name: 'People',
                items: [
                    { name: 'Frank', age: 34, height: '6\'2'},
                    { name: 'Dave', age: null, occupation: 'Engineer'},
                    { name: 'Dave Smith', age: 23, occupation: 'Nurse'},
                    { name: 'Donald', age: 73, occupation: 'President'}
                    
                ]
            }
        ]

    }
})
