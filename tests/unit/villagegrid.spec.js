import Vuex from "vuex";
import VueDragscroll from 'vue-dragscroll'
import {createLocalVue, mount, shallowMount} from "@vue/test-utils";
import Wall from '@/components/tiles/Wall'
import WallRight from '@/components/tiles/WallRight'
import WallLeft from '@/components/tiles/WallLeft'
import WallRightEnd from '@/components/tiles/WallRightEnd'
import WallLeftEnd from '@/components/tiles/WallLeftEnd'
import NatureForest_1 from '@/components/tiles/NatureForest_1'
import NatureForest_2 from '@/components/tiles/NatureForest_2'
import WaterCornerTile from '@/components/tiles/WaterCornerTile'
import WaterTile from '@/components/tiles/WaterTile'
import BackgroundTile from '@/components/tiles/BackgroundTile'
import Barracks from '@/components/tiles/Barracks'
import BaseTile from '@/components/tiles/BaseTile'
import BuildingTile from '@/components/tiles/BuildingTile'
import ConstructionTile from '@/components/tiles/ConstructionTile'
import DefenceTower from '@/components/tiles/DefenceTower'
import Harbor from '@/components/tiles/Harbor'
import Headquarters from '@/components/tiles/Headquarters'
import House from '@/components/tiles/House'
import Lumberyard from '@/components/tiles/Lumberyard'
import Market from '@/components/tiles/Market'
import Mine from '@/components/tiles/Mine'
import Smith from '@/components/tiles/Smith'
import Storage from '@/components/tiles/Storage'
import Tavern from '@/components/tiles/Tavern'
import CombatLogsModal from "@/components/ui/modals/CombatLogsModal";
import VillageGridComponent from "@/components/VillageGrid";

let villageGridWrapper;
let store;
let getters;
let mockGrid = require("../mockData/test_grid.json")
const localVue = createLocalVue()
localVue.component('CombatLogsModal', CombatLogsModal)
localVue.component('Wall', Wall)
localVue.component('WallRight', WallRight)
localVue.component('WallLeft', WallLeft)
localVue.component('WallRightEnd', WallRightEnd)
localVue.component('WallLeftEnd', WallLeftEnd)
localVue.component('NatureForest_1', NatureForest_1)
localVue.component('NatureForest_2', NatureForest_2)
localVue.component('WaterCornerTile', WaterCornerTile)
localVue.component('WaterTile', WaterTile)
localVue.component('BackgroundTile', BackgroundTile)
localVue.component('Barracks', Barracks)
localVue.component('BaseTile', BaseTile)
localVue.component('BuildingTile', BuildingTile)
localVue.component('ConstructionTile', ConstructionTile)
localVue.component('DefenceTower', DefenceTower)
localVue.component('Harbor', Harbor)
localVue.component('Headquarters', Headquarters)
localVue.component('House', House)
localVue.component('Lumberyard', Lumberyard)
localVue.component('Market', Market)
localVue.component('Mine', Mine)
localVue.component('Smith', Smith)
localVue.component('Storage', Storage)
localVue.component('Tavern', Tavern)
localVue.component('CombatLogsModal', CombatLogsModal)
localVue.component('villagegrid-component', VillageGridComponent)
localVue.use(Vuex)
localVue.use(VueDragscroll)


beforeEach(() => {
    getters = {
        firstLogin: jest.fn().mockReturnValue(true)
    }

    store = new Vuex.Store({
        getters
    })

    villageGridWrapper = mount(VillageGridComponent, {
        store,
        localVue
    })
})

afterAll(() => {
    villageGridWrapper.destroy()
})


describe('VillageGrid', () => {
    it('should render properly', async () => {
        const villageGridTestId = '[data-test="villageGridTestId"]'
        expect(villageGridWrapper.find(villageGridTestId).exists()).toBeTruthy()
    })

    it('should emit toggleModal when tile is clickable', async () => {
        const firstBuildableTile = mockGrid[0][0]
        villageGridWrapper.setData({grid: mockGrid})
        villageGridWrapper.vm.showModal(firstBuildableTile)
        await villageGridWrapper.vm.$nextTick()
        // emits return array arrays
        expect(villageGridWrapper.emitted().toggleModal[0]).toEqual([firstBuildableTile])
    })
    
    it('should return false when tile is unclickable', async () => {
        const expected = false;
        const unBuildableTile = mockGrid[0][3]
        villageGridWrapper.setData({grid: mockGrid})
        const actual = villageGridWrapper.vm.showModal(unBuildableTile)
        expect(actual).toBe(expected);
    })
})
