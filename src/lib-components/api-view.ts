import Vue from 'vue';

export interface ApiState<T> {
  pending: boolean;
  response: Response | null;
  error: Error | null;
  data: T | null;
}

export default /*#__PURE__*/Vue.extend({
  name: 'api-view',
  props: {
    url: {
      type: String,
      required: true,
    }
  },
  data(): ApiState<any> {
    return {
      pending: false,
      response: null,
      error: null,
      data: null,
    }
  },
  render(h): any {
    if (this.$scopedSlots.universal !== undefined) {
      return this.$scopedSlots.universal({
        pending: this.pending,
        response: this.response,
        error: this.error,
        data: this.data,
      })
    }

    if (this.error !== null) {
      const data = {error: this.error}
      return this.$scopedSlots.networkError !== undefined ?
        this.$scopedSlots.networkError(data) : h('div', ['Failed to load.'])
    }
    if (this.response !== null && !this.response.ok) {
      const data = {response: this.response}
      return this.$scopedSlots.error !== undefined ?
        this.$scopedSlots.error(data) : h('div', ['Something went wrong.'])
    }
    if (this.pending) {
      return this.$scopedSlots.pending !== undefined ?
        this.$scopedSlots.pending({}) : h('div', ['Loading.'])
    }
    if (this.$scopedSlots.default === undefined) {
      throw TypeError('[vue-api-tools] Must provide default or universal *scoped* slots.')
    }
    return this.$scopedSlots.default({
      data: this.data,
    })
  },
  methods: {
    fetchData() {
      if (this.pending) {
        console.warn('[vue-api-tools] Attempt to fetch before previous' +
          'operation finishes.')
      }
      this.pending = true
      this.response = null
      this.error = null
      this.data = null
      fetch(this.url)
      .then(res => {
        this.response = res
        return res.json()
      })
      .then(data => this.data = data)
      .catch(err => this.error = err)
      .finally(() => this.pending = false)
    }
  },
  created() {
    this.fetchData()
  }
})
