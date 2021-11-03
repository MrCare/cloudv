import helloWorld from "./hello-world.vue"

helloWorld.install = (Vue) => {
  Vue.component(helloWorld.name, helloWorld)
}

export default helloWorld