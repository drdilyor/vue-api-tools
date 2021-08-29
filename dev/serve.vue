<template>
  <div>
    <api-view
        url="https://api.github.com/users/drdilyor/repos"
        v-slot="{ data: repos }"
    >
      <ul>
        <li v-for="repo in repos" :key="repo.id">
          <a :href="repo.html_url">{{ repo.name }}</a>
        </li>
      </ul>
    </api-view>
  </div>
</template>
<script>
import { ApiView } from './vue-api-tools.esm';

export default {
  components: {
    ApiView
  }
};
</script>
