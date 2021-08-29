# Vue API tools - reduce boilerplate

This package helps to reduce boilerplate in small to medium-sized projects.
*Write less, do more*. This is your first taste of this library:

```html
<template>
  <api-view url="https://api.github.com/users/drdilyor/repos" v-slot="{data: repos}">
    <ul>
      <li v-for="repo in repos" :key="repo.id">
        <a :href="repo.html_url">{{ repo.name }}</a>
      </li>
    </ul>
  </api-view>
</template>

<script>
import {ApiView} from 'vue-api-tools'

export default {
  componenst: {
    ApiView,
  }
}
</script>
```

It renders
- 'Loading.' when the request is pending
- 'Something went wrong' when the request failed with 4xx or 5xx HTTP codes
- 'Failed to load' if network error occured 
- and finally the `default` slot if request was successfull.

[See demo here](https://codesandbox.io/s/still-water-ke8uv?file=/src/App.vue)

## Installation
```shell
npm install vue-api-tools
#-- or --#
yarn add vue-api-tools
```

## Drawbacks
Let's be honest, this library is not really flexible, nor it is tries
to be swiss army knife for working with APIs. It is simple and small
library, easy to get started and contribute.

If this library doesn't fit you 100%, you can always just copy and
paste `src/lib-components/*` files. It is that simple ¯\\\_(ツ)_/¯

## Docs
`ApiView` component offers 4 slots:
- `networkError` with `{error: Error}`
- `error` with `{response: Response, data: any}`
- `pending` with `{}`
- `default` with `{data: any}`

They all must be *scoped* slots.

There is also fifth slot: `universal`. If provided, it will be used
instead of other 4 slots. It will be called with `ApiState` object:
```ts
interface ApiState<T> {
  pending: boolean,
  response: Response | null,
  error: Error | null,
  data: T | null,
}
```
You must provide at least `default` or `universal` slots.

## Overriding default values for slots
TODO: this is currently under todo and is planned to be released in v0.2

## License
MIT
