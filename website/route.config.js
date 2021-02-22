import {componentsList} from './nav.config.js'

 let route=[
  {
    path: '/homepage',
    name: 'homepage',
    component: () =>
          import('./pages/homepage.vue'),
  },
{
  path: '',
  redirect: { name: 'homepage' },
  hidden: true
}
]
let componentRoute={
  path: '/component',
  name: 'component',
  redirect: { name: 'select' },
  component: () =>
        import('./pages/component.vue'),
}
componentRoute.children=componentsList.map(({name,title})=>{
  return {
      path:name,
      name:name,
      component:r => require.ensure([], () => r(require(`./docs/${name}.md`)), 'app')
  }
})

export default [componentRoute , ...route]
