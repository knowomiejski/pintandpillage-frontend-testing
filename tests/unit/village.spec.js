import Vuex from "vuex";
import VueDragscroll from 'vue-dragscroll'
import {createLocalVue, mount} from "@vue/test-utils";
import Village from "@/views/Village"
import Modal from "@/components/ui/modals/BaseModal";
import ConstructingModal from "@/components/ui/modals/ConstructingModal";
import SettingsModal from "@/components/ui/modals/SettingsModal";
import TutorialModal from "@/components/ui/modals/TutorialModal";
import LogsModal from "@/components/ui/modals/LogsModal";
import CombatLogsModal from "@/components/ui/modals/CombatLogsModal";
import VillageGridComponent from "@/components/VillageGrid";

let villageWrapper;
let store;
let getters;
let mockGrid = require("../mockData/test_grid.json")
const localVue = createLocalVue()
localVue.component('Village', Village)
localVue.component('Modal', Modal)
localVue.component('ConstructingModal', ConstructingModal)
localVue.component('SettingsModal', SettingsModal)
localVue.component('TutorialModal', TutorialModal)
localVue.component('LogsModal', LogsModal)
localVue.component('CombatLogsModal', CombatLogsModal)
// localVue.component('villagegrid-component', VillageGridComponent)
localVue.use(Vuex)
localVue.use(VueDragscroll)


beforeEach(() => {
    getters = {
        firstLogin: jest.fn().mockReturnValue(true),
        village: jest.fn().mockReturnValue({
            buildingsThatCanBeBuild: jest.fn().mockReturnValue(['House'])
        })
    }

    store = new Vuex.Store({
        getters
    })

    villageWrapper = mount(Village, {
        store,
        stubs: {
            VillagegridComponent: true
        },
        localVue
    })
})

afterAll(() => {
    villageWrapper.destroy()
})


describe('Village', () => {
    it('should render properly', async () => {
        const villageTestId = '[data-test="villageTestId"]'
        expect(villageWrapper.find(villageTestId).text()).toBeTruthy()
    })

    it('should display tutorial when first logged in', async () => {
        const tutorialModalTestId = '[data-test="tutorialModalTestId"]'
        expect(villageWrapper.find(tutorialModalTestId).text()).toBeTruthy()
    })

    it('should not display tutorial when first logged in', async () => {
        const tutorialModalTestId = '[data-test="tutorialModalTestId"]'
        store.hotUpdate({
            getters: {
                firstLogin: jest.fn().mockReturnValue(false)
            }
        })
        await villageWrapper.vm.$nextTick();
        expect(villageWrapper.vm.firstTimeLoggedIn).toBe(false)
        expect(villageWrapper.find(tutorialModalTestId).exists()).toBe(false)
    })

    it('should display a building menu when a buiding tile is clicked', async () => {
        const constructionModalTestId = '[data-test="constructionModalTestId"]'
        expect(villageWrapper.find(constructionModalTestId).exists()).toBe(false)
        villageWrapper.vm.showModal(mockGrid[0][0])
        await villageWrapper.vm.$nextTick();
        expect(villageWrapper.find(constructionModalTestId).exists()).toBe(true)
    })
})