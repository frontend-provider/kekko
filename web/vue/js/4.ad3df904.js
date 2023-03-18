(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[4],{"0b7e":function(a,e,t){},aee8:function(a,e,t){"use strict";t("0b7e")},d7c4:function(a,e,t){"use strict";t.r(e);var n=function(){var a=this,e=a._self._c;return e("q-page",{attrs:{padding:""}},[e("data-manager")],1)},s=[],l=(t("14d9"),function(){var a=this,e=a._self._c;return e("div",[a._m(0),e("q-tabs",{staticClass:"text-grey",attrs:{"active-color":"blue-grey","indicator-color":"blue-grey"},model:{value:a.selectedTab,callback:function(e){a.selectedTab=e},expression:"selectedTab"}},[e("q-tab",{attrs:{default:"",icon:"storage",name:"available-data",label:"Available Data"}}),e("q-tab",{attrs:{name:"import-data",icon:"import_export",label:"Import more"}})],1),e("q-tab-panels",{attrs:{animated:""},model:{value:a.selectedTab,callback:function(e){a.selectedTab=e},expression:"selectedTab"}},[e("q-tab-panel",{attrs:{name:"available-data"}},["idle"===a.datasetScanstate?e("div",[e("q-btn",{attrs:{color:"primary",label:"Scan available data"},on:{click:function(e){return e.preventDefault(),a.scan.apply(null,arguments)}}})],1):"scanning"===a.datasetScanstate?e("div",[e("q-spinner-bars",{staticClass:"full-width",staticStyle:{height:"48px"},attrs:{color:"secondary"}}),e("p",{staticClass:"text-center q-pa-sm"},[a._v("Searching for available Datasets...")])],1):"scanned"===a.datasetScanstate?e("div",[a.unscannableMakets.length?e("q-banner",{staticClass:"bg-warning",attrs:{actions:[{label:a.viewUnscannable?"Hide Details":"Show Details",handler:function(){a.toggleUnscannable()}}]}},[e("b",{staticClass:"text-weight-bold"},[a._v("Some markets were unscannable")]),a.viewUnscannable?e("div",[e("p",{staticClass:"text-red-10 text-weight-medium"},[a._v("Unable to find datasets in the following markets:")]),e("ol",a._l(a.unscannableMakets,(function(t){return e("li",{key:t},[e("ul",{staticClass:"unscannable-item"},[e("li",[e("b",{staticClass:"text-blue"},[a._v(a._s(t.exchange))])]),e("li",[a._v(a._s(t.currency))]),e("li",[a._v(a._s(t.asset))])])])})),0)]):a._e()]):a._e(),e("br"),a.datasets.length?e("q-table",{attrs:{title:"Local Datasets","row-key":"id",data:a.datasets,columns:a.tblColumns,dense:"",filter:a.dsFilter,separator:"vertical"},scopedSlots:a._u([{key:"top-right",fn:function(t){return[e("q-input",{staticClass:"col-6",attrs:{debounce:"300","hide-underline":"",color:"secondary"},scopedSlots:a._u([{key:"append",fn:function(){return[e("q-icon",{attrs:{name:"search"}})]},proxy:!0}],null,!0),model:{value:a.dsFilter,callback:function(e){a.dsFilter=e},expression:"dsFilter"}})]}}],null,!1,2465650170)}):a._e(),a.datasets.length?a._e():e("p",[a._v("\n          It looks like you don't have any local data yet.\n        ")])],1):a._e()]),e("q-tab-panel",{attrs:{name:"import-data"}},[e("div",{staticClass:"row justify-center"},[e("div",{staticClass:"text-center"},[e("p",[a._v("You can easily import more market data directly from exchanges using the importer.")]),e("q-btn",{attrs:{color:"primary",label:"Go to the importer!"},on:{click:function(e){return e.preventDefault(),a.$router.push("data/importer")}}})],1)])])],1)],1)}),i=[function(){var a=this,e=a._self._c;return e("div",[e("div",{staticClass:"text-h4 q-mb-md"},[a._v("Local Data")]),e("p",[a._v("\n      Gekko needs local market data in order to backtest strategies. "),e("br"),a._v(" The local\n      data can also be used in a warmup period when running a strategy against a\n      live market.\n    ")])])}],r=t("c41d"),c={mixins:[r["a"]],mounted:function(){this.scan()},data:function(){return{viewUnscannable:!1,dsFilter:"",selectedTab:"available-data"}},methods:{toggleUnscannable:function(){this.viewUnscannable=!this.viewUnscannable}}},o=c,d=(t("aee8"),t("2877")),u=t("429b"),b=t("7460"),p=t("adad"),m=t("823b"),v=t("9c40"),f=t("a154"),g=t("54e1"),h=t("eaac"),_=t("27f9"),k=t("0016"),w=t("eebe"),y=t.n(w),x=Object(d["a"])(o,l,i,!1,null,"5c7a10c2",null),q=x.exports;y()(x,"components",{QTabs:u["a"],QTab:b["a"],QTabPanels:p["a"],QTabPanel:m["a"],QBtn:v["a"],QSpinnerBars:f["a"],QBanner:g["a"],QTable:h["a"],QInput:_["a"],QIcon:k["a"]});var C={name:"DataPage",components:{DataManager:q}},T=C,Q=t("9989"),S=Object(d["a"])(T,n,s,!1,null,null,null);e["default"]=S.exports;y()(S,"components",{QPage:Q["a"]})}}]);