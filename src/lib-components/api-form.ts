// import Vue from 'vue'
// 
// export default /*!__PURE__*/Vue.extend({
//   props: {
//     url: {
//       type: String,
//       required: true,
//     },
//     method: {
//       type: String,
//       validator: val => [
//         'GET',
//         'POST',
//         'PUT',
//         'DELETE',
//       ],
//       default: 'POST',
//     }
//   },
//   data: () => ({
//     pending: false,
//     response: null,
//     error: null,
//     data: null,
//   }),
//   render(h) {
//     if (this.$scopedSlots.default === undefined) {
//       throw TypeError('[vue-api-tools] Must provide default slot.')
//     }
// 
//     return this.$scopedSlots.default({
//       pending: this.pending,
//       response: this.response,
//       error: this.error,
//       data: this.data,
//       status: 
//         this.error ? 'networkError' :
//         this.response != null && !this.response.ok ? 'error' :
//         this.pending ? 'pending'
//         : 'default'
//     })
//   },
//   methods: {
//     submit(data) {
//       if (this.pending) {
//         console.warn('[vue-api-tools] Attempt to submit before previous' +
//           ' operation finishes.')
//       }
//       this.pending = true
//       this.response = null
//       this.error = null
//       this.data = null
//       fetch(this.url, {
//         method: this.method,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       })
//       .then(res => {
//         this.response = res
//         return res.json()
//       })
//       .then(data => this.data = data)
//       .catch(err => this.error = err)
//       .finally(() => this.pending = false)
//     }
//   },
// })
