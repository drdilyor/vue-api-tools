# Vue API tools - reduce boilerplate

This package helps to reduce boilerplate in small to medium-sized projects.
*Write less, do more*. This is your first taste of this library:

```
<api-view url="https://github.com/users/drdilyor/repos" v-slot="{data: repos}">
  <ul>
    <li v-for="repo in repos" :key="repo.id">
      <a :href="repo.html_url">{{ repo.name }}</a>
    </li>
  </ul>
</api-view>
```

It renders
- 'Loading.' when the request is pending
- 'Something went wrong' when the request failed with 4xx or 5xx HTTP codes
- 'Failed to load' if network error occured 
- and finally the `default` slot if 

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
paste `src/lib-components/*` files. It is that simple ¯\_(ツ)_/¯
