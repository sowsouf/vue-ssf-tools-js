<template>
  <div class="home" style="background:#000; position:fixed; top: 0; bottom: 0; left: 0; right: 0">
    <h1>Welcome to homepage, do what you want</h1>
    <button @click="run">re-run</button>
  </div>
</template>

<script>

  import API       from '@/app/tools/api'
  import Apartment from "@/components/SsfToolsJs/components/apartment";

  export default {

    name: 'Home',

    components: {},

    data() {
      return {}
    },

    created() {
    },

    methods: {

      async run() {
        let Api = new API({
          server: 'http://localhost:2222/api/v1',
          token : 'test',
        })

        Api.destroy('/accounts', 'test', { headers: { 'X-API-KEY': 'your-api-key' } })

        // console.log(await Apartment.mine())

      }


    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

  .home {
    padding-right: .75rem;
    padding-left: .75rem;
  }

</style>
