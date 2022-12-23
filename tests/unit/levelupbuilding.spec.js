import {createLocalVue, shallowMount} from "@vue/test-utils";
import Vuex from "vuex";
import LevelUpBuilding from "../../src/components/ui/LevelUpBuilding";
import TimeFrame from "../../src/components/ui/TimeFrame";
import VuejsDialog from 'vuejs-dialog';
import Vue from "vue";
import PopulationFrame from "../../src/components/ui/PopulationFrame";
import ResourceItem from "../../src/components/ui/ResourceItem";

let levelUpBuildingWrapper;
let store;
let getters;
let state;
let actions;
const localVue = createLocalVue()
localVue.use(Vuex)
Vue.component("TimeFrame", TimeFrame);
Vue.component("PopulationFrame", PopulationFrame);
Vue.component("ResourceItem", ResourceItem);

beforeEach(() => {
    getters = {
        building: () => () => {
            return require("../mockData/test_building_data.json")
        }
    }
    state = {
        village: {
            data: require("../mockData/test_village_mock_data.json")
        }
    }
    
    actions = {
        removeBuilding: jest.fn(() => Promise.resolve()),
        updateBuilding: jest.fn(() => Promise.resolve())
    }

    store = new Vuex.Store({
        getters,
        state,
        actions
    })

    levelUpBuildingWrapper = shallowMount(LevelUpBuilding, {
        store,
        localVue,
        mocks: {
                $dialog: {
                    confirm:  jest.fn(() => Promise.resolve())
                }
        }
    });

    levelUpBuildingWrapper.setData({
        checkAvailability: true
    })

});

afterAll(() =>{
    levelUpBuildingWrapper.destroy()
})

describe('LevelUpBuidling', () => {
    it('should return true when village has more resources then cost of building', async () => {
        const expected = true;
        const actual = levelUpBuildingWrapper.vm.canBeLeveledUp();

        expect(actual).toBe(expected)
    });

    it('should return false when village has less resources then cost of building', async () => {
        const expected = false;
        store.hotUpdate({
            getters: {
                building: () => () => {
                    return require("../mockData/test_building_high_resources_cost_data.json")
                }
            }
        })

        const actual = levelUpBuildingWrapper.vm.canBeLeveledUp();
        expect(actual).toBe(expected)
    });

    it('should ask for confirmation when trying to remove a building', async () => {
        const expectedMessage = 'Are you sure you want to delete the level 2 Mine?This action cannot be undone and no resources will be returned'
        const expectedBuildingId = 34
        await levelUpBuildingWrapper.vm.removeBuilding()
        expect(levelUpBuildingWrapper.vm.$dialog.confirm).toHaveBeenCalledWith(expectedMessage)
        expect(actions.removeBuilding).toHaveBeenCalledWith(expect.any(Object), expectedBuildingId)
    })

    it('should call vuex action updateBuilding with id 34 when updateBuilding is called', async () => {
        const expectedBuildingId = 34
        await levelUpBuildingWrapper.vm.updateBuilding()
        expect(actions.updateBuilding).toHaveBeenCalledWith(expect.any(Object), expectedBuildingId)
    })
});