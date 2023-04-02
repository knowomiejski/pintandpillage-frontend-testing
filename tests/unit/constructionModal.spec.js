import {createLocalVue, shallowMount} from "@vue/test-utils";
import Vuex from "vuex";
import LevelUpBuilding from "../../src/components/ui/LevelUpBuilding";
import ConstructingModal from "@/components/ui/modals/ConstructingModal.vue";
import mockVillageData from "../mockData/test_village_mock_data.json"
import BuildingListItemVue from "@/components/ui/BuildingListItem.vue";

let buildingsThatCanBeBuild = mockVillageData.buildingsThatCanBeBuild
let constructionModalWrapper;
let store;
let getters;
const localVue = createLocalVue()
localVue.component('LevelUpBuilding', LevelUpBuilding)
localVue.component('BuildingListItem', BuildingListItemVue)
localVue.use(Vuex)


beforeEach(() => {
    getters = {}

    store = new Vuex.Store({
        getters
    })

    constructionModalWrapper = shallowMount(ConstructingModal, {
        store,
        localVue,
        computed: {
            allBuildingsThatCanBeBuild() {
                return buildingsThatCanBeBuild
            }
        }
    });
});

afterAll(() => {
    constructionModalWrapper.destroy();
});

describe('ConstructionModal', () => {
    it('should contain the Wall building when it is in the allowedBuilding props', async () => {
        constructionModalWrapper.vm.propsData = { allowedBuilding: 'Wall'}
        let expected = false;
        let wallBuilding = {
            "buildingId": 0,
            "description": "The wall increases your village defence",
            "level": 0,
            "producesResources": false,
            "buildingLevelRequiredToLevelup": {},
            "constructionTimeLeft": "00:00:00",
            "constructionTime": "00:00:12",
            "levelupFinishedTime": null,
            "constructionTimeSeconds": 12,
            "position": null,
            "resourcesRequiredLevelUp": {
                "Wood": 301,
                "Stone": 301,
                "Beer": 101
            },
            "populationRequiredNextLevel": 53,
            "totalPopulationInUse": 0,
            "points": 0,
            "name": "Wall",
            "defenceBonus": 51,
            "isUnderConstruction": true
        }
        constructionModalWrapper.vm.fillBuildingsThatCanBeBuildList()
        let villageBuildings = constructionModalWrapper.vm.villageBuildings
        let wallNameFound = false;
        for (const buildingKey in villageBuildings) {
            if (villageBuildings[buildingKey].name === wallBuilding.name) {
                wallNameFound = true;
            }
        }
        expect(wallNameFound).toBe(expected);
    })
    it('should contain the Wall building when nothing is in the allowedBuilding props', async () => {
        constructionModalWrapper.vm.propsData = { allowedBuilding: null }
        let expected = false;
        let wallName = 'Wall';
        constructionModalWrapper.vm.fillBuildingsThatCanBeBuildList()
        let villageBuildings = constructionModalWrapper.vm.villageBuildings
        let wallNameFound = false;
        for (const buildingKey in villageBuildings) {
            if (villageBuildings[buildingKey].name === wallName) {
                wallNameFound = true;
            }
        }
        expect(wallNameFound).toBe(expected);
    })
})
