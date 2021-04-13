Vue.component('pagination', {
  template:'#pagination',
  data () {
    return {
      page: {
        totalResult: 0,
        currentPage: 1,
        totalPages: 0,
        perPage: 5
      }
    }
  },
  props: {
    productItem: {
      type: Object
    },
    maxViewPage: {
      type: Number,
      default: 3,
      required: false
    }
  },
  created () {
    this.totalPage()
  },
  computed: {
    totalPage () {
      this.page.totalResult = this.productItem.length
      // console.log(this.page.totalResult)
      let newPage = Math.ceil(this.productItem.length / this.page.perPage)
      return this.page.totalPages = newPage
    },
    isInFirstPage () {
      return this.page.currentPage === 1
    },
    isInLastPage () {
      return this.page.currentPage === this.totalPages
    },
    startPage () {
      if (this.currentPage === 1) {
        return 1
      }
      if (this.currentPage === this.totalPages) {
        return this.totalPages - this.maxViewPage + 1
      }
      return this.currentPage - 1
    },
    endPage () {
      return Math.min(this.startPage + this.maxViewPage -1, this.totalPages)
    },
    pages () {
      const pageArr = [];
      for (let i = this.startPage; i <= this.endPage; i += 1) {
        pageArr.push({
          name: i,
          isDisabled: i === this.currentPage
        })
      }
      return pageArr
    }
  },
  methods: {
    onFirstPage () {
      this.$emit('pagechanged', 1)
    },
    onPreviousPage () {
      if ( this.currentPage > 1) {
        this.$emit('pagechanged', this.currentPage - 1)
      }
    },
    onCurrentPage (page) {
      this.$emit('pagechanged', page)
    },
    onNextPage () {
      if(this.currentPage < this.totalPages){
        this.$emit('pagechanged', this.currentPage + 1)
      }
    },
    onLastPage () {
      this.$emit('pagechanged', this.totalPages )
    },
    isPageActive (page) {
      return this.currentPage === page
    }
  },
})

const app = new Vue({
  el: '#app',
  data () {
    return {
      dataList: [],
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      const api = 'https://www.json-generator.com/api/json/get/cknklDscqG?indent=2'
      axios.get(api).then(response => {
        let newData = response.data
        this.dataList = newData
      })
    },
    onPageChange (page) {
      // console.log(page)
      this.currentPage = page
    },
  }
})