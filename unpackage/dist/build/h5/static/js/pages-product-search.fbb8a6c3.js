(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-product-search"],{"030c":function(t,a,e){"use strict";var i=e("ee27");e("99af"),Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;i(e("45e8"));var r=e("5d87"),o=new r.Product,n={data:function(){return{productList:[],loadStatus:"more",page:1}},onLoad:function(t){this.$data.real_price=t.real_price?t.real_price:"",this.$data.cate_id=t.cate_id?t.cate_id:"",this.$data.is_top=t.is_top?t.is_top:"",this.getProduct()},onReachBottom:function(){if("noMore"==this.loadStatus)return!1;this.page++,this.getProduct()},methods:{getProduct:function(){var t=this,a=10,e={cate_id:t.$data.cate_id,real_price:this.$data.real_price,is_top:this.$data.is_top,page_size:a,page:this.page};this.$data.loadStatus="loading",o.lists(e,(function(e){var i=t.$data.productList.concat(e.data);t.$data.productList=i,e.data.length<a?t.$data.loadStatus="noMore":t.$data.loadStatus="more"}))}}};a.default=n},"3bbb":function(t,a,e){"use strict";e.r(a);var i=e("a9ed"),r=e("f1b2");for(var o in r)"default"!==o&&function(t){e.d(a,t,(function(){return r[t]}))}(o);var n,u=e("f0c5"),d=Object(u["a"])(r["default"],i["b"],i["c"],!1,null,"15efba15",null,!1,i["a"],n);a["default"]=d.exports},a9ed:function(t,a,e){"use strict";var i={jhxProductList:e("45e8").default},r=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-uni-view",[e("jhx-product-list",{attrs:{status:t.loadStatus,productList:t.productList,column:1}})],1)},o=[];e.d(a,"b",(function(){return r})),e.d(a,"c",(function(){return o})),e.d(a,"a",(function(){return i}))},f1b2:function(t,a,e){"use strict";e.r(a);var i=e("030c"),r=e.n(i);for(var o in i)"default"!==o&&function(t){e.d(a,t,(function(){return i[t]}))}(o);a["default"]=r.a}}]);