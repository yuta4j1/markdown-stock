import { mount } from '@vue/test-utils'
import DialogMessage from '@components/DialogMessage.vue'

describe('DialogMessage component', () => {
    test('snapshot', () => {
        const wrapper = mount(DialogMessage)
        wrapper.setProps({ message: 'This is a Message test.' })
        expect(wrapper.element).toMatchSnapshot()
    })

})