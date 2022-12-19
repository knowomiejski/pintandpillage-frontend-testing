// mocks: time-frame, resource item, button, vuexcurrentBuilding
// test: if not under construction display lvlup container
import Vuex from "vuex";
import {createLocalVue, shallowMount} from "@vue/test-utils";
import TimeFrame from "@/components/ui/TimeFrame";
import PopulationFrame from "@/components/ui/PopulationFrame";
import ResourceItem from "@/components/ui/ResourceItem";

let lvlUpBuildingWrapper;
let store;
let getters;
const localVue = createLocalVue()
localVue.component('TimeFrame', TimeFrame)
localVue.component('PopulationFrame', PopulationFrame)
localVue.component('ResourceItem', ResourceItem)
localVue.use(Vuex)


beforeEach(() => {

    getters = {
        building: () => () => {
            return require("../mockData/test_building_data.json")
        }
    }

    store = new Vuex.Store({
        getters
    })

    lvlUpBuildingWrapper = shallowMount({
        store,
        localVue
    })
})

afterAll(() => {
    lvlUpBuildingWrapper.destroy()
})


describe('LevelUpBuilding', () => {
    it('should display the levelUpInfoContainer when currentBuilding is NOT under construction', async () => {
        const expectedContainerId = '#notInProgress'
        const actualContainerId = lvlUpBuildingWrapper.find("#notInProgress")
        expect(actualContainerId).not.toBeUndefined()
    })
})
