<script lang="ts">
import Vue from 'vue';
import {ApiView} from '@/lib-components'

export default Vue.extend({
  name: 'ServeDev',
  components: {
    ApiView,
  },
});
</script>

<template>
  <div id="app">
    <api-view
      url="https://api.github.com/users/drdilyor/repos"
      v-slot="{data: repos}"
    >
      <ul>
        <li v-for="repo in repos" :key="repo.id">
          <a :href="repo.html_url">{{ repo.name }}</a>
        </li>
      </ul>
    </api-view>
  </div>
</template>
