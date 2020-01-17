import { mount, createLocalVue } from '@vue/test-utils'
import Home from './Home.vue'
import store from '../testStore'
import ElementUI from 'element-ui'
import ItemCard from './Accessories/ItemCard.vue'

const localVue = createLocalVue()
localVue.use(ElementUI)

describe('Home.vue Page Related Tests', () => {
    const wrapper = mount(Home, { store, localVue })
    it('Is a Vue instance', () => {
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('Has the same number of item cards displayed upon first render that are in the first group in the test store.', () => {
        expect(wrapper.findAll(ItemCard).length).toBe(3)
    })

    it('Clicking advanced search switch button populates the Attributes computed array.', async () => {
        //Click the second switch button which sets advancedSearch to true.
        const elSwitch = wrapper.findAll('.el-switch').at(1)
        elSwitch.trigger('click')

        await wrapper.vm.$nextTick()

        expect(wrapper.vm.Attributes.toString()).toBe('make,model,year,miles,newCar')
    })

    it('Clicking Element UI check boxes properly puts values in selectedAttributes', async () => {
        for(var i = 0; i < 3; i++){
            wrapper.findAll('.el-checkbox').at(i).trigger('click')
            await wrapper.vm.$nextTick()
        }
        
        expect(wrapper.vm.selectedAttributes.toString()).toBe('make,model,year')
    })

})

describe('Home.vue Search Related Tests', () => {
    const wrapper = mount(Home, { store, localVue })

    it('Correctly changes item cards when a different group is selected', async () => {

        //Find the second instance of an element ui button on the Home page, the first is selected by default.
        const elButton = wrapper.findAll('.el-button').at(1)
        elButton.trigger('click')
        
        await wrapper.vm.$nextTick()

        expect(wrapper.findAll(ItemCard).length).toBe(4)
        
    })

    it('FilteredItems computed value properly changes when a different group button is clicked', () => {
        const elButton = wrapper.findAll('.el-button').at(1)
        elButton.trigger('click')
        expect(wrapper.vm.FilteredItems.length).toBe(store.state.Groups[1].items.length)
    })

    it('Selecting advanced search and a checkbox returns all item cards that contain that attribute.', async () => {
        //Search string is set to empty so all items that have the selected attribute will be returned regardless of its value.
        wrapper.setData({ searchString: '' })
        //Click the second switch button which sets advancedSearch to true.
        const elSwitch = wrapper.findAll('.el-switch').at(1)
        elSwitch.trigger('click')

        await wrapper.vm.$nextTick()

        //Select a checkbox that contains an attribute that not all items in this group have, in this case the attribute is 'occupation'.
        const elCheckBox = wrapper.findAll('.el-checkbox').at(3)
        elCheckBox.trigger('click')

        await wrapper.vm.$nextTick()
        
        expect(wrapper.findAll(ItemCard).length).toBe(3)

        //Reset checbox and switch.
        elCheckBox.trigger('click')
        elSwitch.trigger('click')
    })

    it('Selecting advanced search and a checkbox returns all item cards that contain that attribute that contains the given search string', async () => {
        //Click the second switch button which sets advancedSearch to true.
        const elSwitch = wrapper.findAll('.el-switch').at(1)
        elSwitch.trigger('click')

        await wrapper.vm.$nextTick()

        //Select a checkbox that contains an attribute that not all items in this group have, in this case the attribute is 'occupation'.
        const elCheckBox = wrapper.findAll('.el-checkbox').at(3)
        elCheckBox.trigger('click')

        await wrapper.vm.$nextTick()

        wrapper.setData({ searchString: 'Engineer' })

        await wrapper.vm.$nextTick()
        
        expect(wrapper.findAll(ItemCard).length).toBe(1)
    })
    
    it('Correctly searches for null or empty values', async () => {
        wrapper.setData({ searchString: '' })

        //Select the second switch button, which sets searching on null and empty values to true.
        const elSwitch = wrapper.findAll('.el-switch').at(0)
        elSwitch.trigger('click')
        
        await wrapper.vm.$nextTick()

        //Select the checkbox with the value 'age'.
        const elCheckBox = wrapper.findAll('.el-checkbox').at(1)
        elCheckBox.trigger('click')
        
        await wrapper.vm.$nextTick()

        //The only item in the testStore with an age of 'null' should be Dave
        expect(wrapper.vm.FilteredItems[0].name).toBe('Dave')
    })

    it('Correctly displays the number of filtered items', async () => {
        expect(wrapper.text()).toContain('Results 1')
    })
})

describe('ItemCard.vue', () => {
    const wrapper = mount(ItemCard, { 
        localVue,
        propsData: {
            Title: 'People 2',
            Item: { name: 'Dave', age: null, occupation: 'Engineer'}
        }
     })

    it('Is a Vue instance', () => {
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    
})