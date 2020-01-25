import { mount } from '@vue/test-utils'
import DialogMessage from '../../DialogMessage.vue'
import { DialogMessageProps } from '../../../models/Message'

describe('DialogMessage component', () => {
    test('snapshot', () => {
        const wrapper = mount(DialogMessage)
        const props: DialogMessageProps = {
            message: {
                type: 'success',
                message: 'Message test.'
            },
            okIsLink: false,
            onOk: () => {},
            onCancel: () => {}
        }
        wrapper.setProps(props)
        expect(wrapper.element).toMatchSnapshot()
    })

})