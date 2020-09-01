<template>
  <div id="app">
    <home/>
  </div>
</template>

<script>

    import Home from './components/pages/Home/Index'

    export default {
        name: 'App',

        components: { Home, },

        created() {
        },

        data() {
            return {}
        },

        methods: {}
    }
</script>

<style>
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
