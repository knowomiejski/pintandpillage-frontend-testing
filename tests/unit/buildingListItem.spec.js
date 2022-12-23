import {createLocalVue, mount} from "@vue/test-utils";
import Vuex from "vuex";
import BuildingListItem from "@/components/ui/BuildingListItem";
import PopulationFrame from '@/components/ui/PopulationFrame'
import TimeFrame from '@/components/ui/TimeFrame'
import ResourceItem from '@/components/ui/ResourceItem'
import VTooltip from 'v-tooltip'

let mockVillage = require("../mockData/test_village_mock_data.json")
let mockBuilding = require("../mockData/test_building_data.json")
let buildingListItemWrapper;
let store;
let getters;
let actions;
const localVue = createLocalVue()
localVue.component('BuildingListItem', BuildingListItem)
localVue.component('PopulationFrame', PopulationFrame)
localVue.component('TimeFrame', TimeFrame)
localVue.component('ResourceItem', ResourceItem)
localVue.use(Vuex)
localVue.use(VTooltip)

beforeEach(() => {
    getters = {
        village: () => {return mockVillage}
    }

    actions = {
        createBuilding: jest.fn().mockResolvedValue(true)
    }

    store = new Vuex.Store({
        getters,
        actions
    })

    buildingListItemWrapper = mount(BuildingListItem, {
        propsData: {
            building: mockBuilding,
            position: {
                x: 0,
                y: 0
            }
        },
        store,
        localVue,
    });

});

afterAll(() =>{
    buildingListItemWrapper.destroy()
})

describe('BuildingListItem', () => {
    it('should render correctly', async () => {
        const buildingListItemTestId = '[data-test="buildingListItemTestId"]'
        expect(buildingListItemWrapper.find(buildingListItemTestId).exists()).toBe(true)
    });

    it('should dispatch createBuilding with the Mine properties when Build button is clicked', async () => {
        const buildingButtonTestId = '[data-test="buildingButtonTestId"]'
        const expectedDispatchCallObject = { "villageId": mockVillage.villageId, "buildingType": mockBuilding.name, "position": {"x": position.x, "y": position.y} }

        const buildButton = buildingListItemWrapper.find(buildingButtonTestId)
        buildButton.trigger('click')
        expect(actions.createBuilding).toHaveBeenCalledWith(expect.any(Object), expectedDispatchCallObject)
    })
});