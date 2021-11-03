
import { mount } from '@vue/test-utils'
import helloWorld from "../src/hello-world.vue";

describe("helloWorld.test.js", () => {
  // 现在挂载组件，你便得到了这个包裹器
  const wrapper = mount(helloWorld, {
    propsData: {
      message: 'World1'
    }
  })

  it('message includes "world"', () => {
    expect(wrapper.html()).toContain("World1");
  });

  it("has the expected html structure", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
