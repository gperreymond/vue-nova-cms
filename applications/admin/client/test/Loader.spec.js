import { shallow } from 'vue-test-utils'
import Loader from '../components/Loader/index.vue'

describe('[admin] <Loader />', () => {
  it('should be mounted', () => {
    const wrapper = shallow(Loader)
    console.log(wrapper)
  })
})
