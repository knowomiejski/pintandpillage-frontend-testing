// mocks: time-frame, resource item, button, vuexcurrentBuilding
// test: if not under construction display lvlup container
import Vuex from "vuex";
import {createLocalVue, shallowMount} from "@vue/test-utils";
import Authentication from "@/views/Authentication";
import Login from "@/components/authentication/Login";
import Register from "@/components/authentication/Register"
import ResetPassword from "@/components/authentication/ResetPassword"
import NewPassword from "@/components/authentication/NewPassword"
import Confirm from "@/components/authentication/Confirm"
import PatchNotes from "@/components/authentication/PatchNotes"
import HomePage from "@/components/authentication/HomePage"

let authenticationWrapper;
let store;
let getters;
const localVue = createLocalVue()
localVue.component('Login', Login)
localVue.component('Register', Register)
localVue.component('ResetPassword', ResetPassword)
localVue.component('NewPassword', NewPassword)
localVue.component('Confirm', Confirm)
localVue.component('PatchNotes', PatchNotes)
localVue.component('HomePage', HomePage)
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

    authenticationWrapper = shallowMount(Authentication, {
        store,
        localVue
    })
})

afterAll(() => {
    authenticationWrapper.destroy()
})


describe('Authentication', () => {
    it('should render properly', async () => {
        const versionNumberTestId = '[data-test="versionNumberTestId"]'
        const expectedVersionContent = '#Version: 1.0.1'
        const versionElement = authenticationWrapper.find(versionNumberTestId)
        expect(versionElement).toContain(expectedVersionContent)
    })
})
