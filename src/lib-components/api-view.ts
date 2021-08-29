import Vue, {CreateElement} from 'vue';

export interface ApiState<T> {
  pending: boolean;
  response: Response | null;
  error: Error | null;
  data: T | null;
}

// HACK: using Vue.extend results in infinite loop.
const networkErrorComponent = {
  functional: true,
  props: {
    error: Error,
    required: Boolean,
  },
  render: (h: CreateElement) => h('div', 'Failed to load.'),
}

const errorComponent = {
  functional: true,
  props: {
    response: {
      type: Response,
      required: true,
    },
    data: {
      required: true,
    },
  },
  render: (h: CreateElement) => h('div', 'Something went wrong.'),
}

const pendingComponent = {
  functional: true,
  props: [],
  render: (h: CreateElement) => h('div', 'Loading.'),
}

export default /*#__PURE__*/Vue.extend({
  name: 'api-view',
  props: {
    url: {
      type: String,
      required: true,
    },
  },
  inject: {
    networkErrorComponent: {
      from: 'apiNetworkErrorComponent',
      default: networkErrorComponent,
    },
    errorComponent: {
      from: 'apiErrorComponent',
      default: errorComponent,
    },
    pendingComponent: {
      from: 'apiPendingComponent',
      default: pendingComponent,
    },
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
    const {
      universal,
      networkError,
      error,
      pending,
      default: defaultSlot,
    } = this.$scopedSlots
    if (universal !== undefined) {
      return universal({
        pending: this.pending,
        response: this.response,
        error: this.error,
        data: this.data,
      })
    }

    if (this.error !== null) {
      const data = {error: this.error}
      return networkError !== undefined ? networkError(data)
        : h((this as any).networkErrorComponent, {props: data})
    }

    if (this.response !== null && !this.response.ok) {
      const data = {
        response: this.response,
        data: this.data,
      }
      return error !== undefined ? error(data)
        : h((this as any).errorComponent, {props: data})
    }

    if (this.pending) {
      return pending !== undefined ? pending({})
        : h((this as any).pendingComponent, {props: {}})
    }

    if (defaultSlot === undefined) {
      throw TypeError('[vue-api-tools] Must provide default or universal *scoped* slots.')
    }

    return defaultSlot({
      data: this.data,
      response: this.response,
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
    },
  },
  created() {
    this.fetchData()
  },
})
