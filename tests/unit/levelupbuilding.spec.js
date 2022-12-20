import {createLocalVue, shallowMount} from "@vue/test-utils";
import Vuex from "vuex";
import LevelUpBuilding from "../../src/components/ui/LevelUpBuilding";
import TimeFrame from "../../src/components/ui/TimeFrame";
import Vue from "vue";
import PopulationFrame from "../../src/components/ui/PopulationFrame";
import ResourceItem from "../../src/components/ui/ResourceItem";

let levelUpBuildingWrapper;
let store;
let getters;
let state;
const localVue = createLocalVue()
localVue.use(Vuex)
Vue.component("TimeFrame", TimeFrame);
Vue.component("PopulationFrame", PopulationFrame);
Vue.component("ResourceItem", ResourceItem);

beforeEach(() => {
    getters = {
        building: () => () => {
            return require("./mockData/test_building_data.json")
        }
    }
    state = {
        village: {
            data: require("./mockData/village_mock_data.json")
        }
    }

    store = new Vuex.Store({
        getters,
        state
    })

    levelUpBuildingWrapper = shallowMount(LevelUpBuilding, {
        store,
        localVue,
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

    it('should return false when village has more resources then cost of building', async () => {
        const expected = false;
        store.hotUpdate({
            getters: {
                building: () => () => {
                    return require("./mockData/test_building_high_resources_cost_data.json")
                }
            }
        })

        const actual = levelUpBuildingWrapper.vm.canBeLeveledUp();

        expect(actual).toBe(expected)
    });
});