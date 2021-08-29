<template>
  <div>
    <button @click="$refs.apiView.fetchData()">Reload</button>
    <api-view url="https://api.github.com/users/drdilyor/repos" ref="apiView">
      <template #networkError="{error}">
        <p>Failed to repositories. Make sure you have internet connection.</p>
      </template>
      <template #error="{response, data}">
        <p v-if="response.status == 404">Error 404: No such user.</p>
        <p v-else-if="response.status == 403">You don't have access to repos.</p>
        <p v-else>Error {{ response.status }}: {{ response.statusText }}</p>
      </template>
      <template #pending>
        <p>Loading repositories... Some cool animations here</p>
      </template>
      <template v-slot="{data: repos}">
        <ul>
          <li v-for="repo in repos" :key="repo.id">
            <a :href="repo.html_url">{{ repo.name }}</a>
          </li>
        </ul>
      </template>
    </api-view>
  </div>
</template>
<script>
import ApiView from '@/lib-components/api-view.ts'

export default {
  provide: {
  },
  components: {
    ApiView,
  },
}
</script>
