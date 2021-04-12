Vue.component('pagination', {
  template:'#pagination',
  props: {
      currentPage: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    },
    maxViewPage: {
      type: Number,
      default: 3,
      required: false
    }
  },

  computed: {
    isInFirstPage: function(){
      return this.currentPage === 1
    },
    isInLastPage: function(){
      return this.currentPage === this.totalPages
    },
    startPage: function(){
      if(this.currentPage === 1){
        return 1
      }
      if(this.currentPage === this.totalPages){
        return this.totalPages - this.maxViewPage + 1
      }
      return this.currentPage - 1
    },
    endPage: function(){
      return Math.min(this.startPage + this.maxViewPage -1, this.totalPages)
    },
    pages: function(){
      const pageArr = [];
      for(let i = this.startPage; i<= this.endPage; i+=1){
        pageArr.push({
          name: i,
          isDisabled: i === this.currentPage
        })
      }
      return pageArr
    }
  },
  methods: {
    onFirstPage: function(){
      this.$emit('pagechanged', 1)
    },
    onPreviousPage: function(){
      if ( this.currentPage > 1) {
        this.$emit('pagechanged', this.currentPage - 1)
      }
    },
    onCurrentPage: function(page){
      this.$emit('pagechanged', page)
    },
    onNextPage: function(){
      if(this.currentPage < this.totalPages){
        this.$emit('pagechanged', this.currentPage + 1)
      }
    },
    onLastPage: function(){
      this.$emit('pagechanged', this.totalPages )
    },
    isPageActive: function(page){
      return this.currentPage === page
    }
  },
})





const app = new Vue({
  el: '#app',
  data () {
    return {
      currentPage: 2,
    }
  },
  methods: {
    onPageChange: function(page){
      console.log(page)
      this.currentPage = page
    },
  }
})