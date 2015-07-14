define(["config","app-config"],function(a,b){"use strict";var c="product",d="product-with-variants",e="product-addon",f="product-set",g={toolbarInstanceName:"productsToolbar",datagridInstanceName:"products"},h=function(a){this.sandbox.emit("sulu.products.new",a)},i=function(){this.sandbox.emit("husky.datagrid."+g.datagridInstanceName+".items.get-selected",function(b){this.sandbox.emit("sulu.products.workflow.triggered",{ids:b,status:a.get("product.status.active").id})}.bind(this))},j=function(){this.sandbox.emit("husky.datagrid."+g.datagridInstanceName+".items.get-selected",function(b){this.sandbox.emit("sulu.products.workflow.triggered",{ids:b,status:a.get("product.status.inactive").id})}.bind(this))},k=function(){this.sandbox.on("sulu.list-toolbar.add",function(){this.sandbox.emit("sulu.products.new")}.bind(this)),this.sandbox.on("sulu.product.workflow.completed",function(){this.sandbox.emit("husky.datagrid."+g.datagridInstanceName+".update")},this),this.sandbox.on("sulu.list-toolbar.delete",function(){this.sandbox.emit("husky.datagrid."+g.datagridInstanceName+".items.get-selected",function(a){this.sandbox.emit("sulu.products.delete",a)}.bind(this))},this),this.sandbox.on("husky.datagrid."+g.datagridInstanceName+".number.selections",function(a){var b=a>0?"enable":"disable";this.sandbox.emit("husky.toolbar."+g.toolbarInstanceName+".item."+b,"delete",!1)}.bind(this)),this.sandbox.on("husky.datagrid."+g.datagridInstanceName+".number.selections",function(a){a>0?(this.sandbox.emit("husky.toolbar."+g.toolbarInstanceName+".button.set","workflow",{icon:"husky-publish"}),this.sandbox.emit("husky.toolbar."+g.toolbarInstanceName+".item.enable","workflow",!1)):(this.sandbox.emit("husky.toolbar."+g.toolbarInstanceName+".button.set","workflow",{icon:"husky-deactivated"}),this.sandbox.emit("husky.toolbar."+g.toolbarInstanceName+".item.disable","workflow",!1))},this)},l=function(){return[{id:"add",icon:"plus-circle","class":"highlight-white",position:1,title:this.sandbox.translate("sulu.list-toolbar.add"),items:[{id:"add-product",title:this.sandbox.translate("products.add-product"),callback:h.bind(this,c)},{id:"add-product-with-variants",title:this.sandbox.translate("products.add-product-with-variants"),callback:h.bind(this,d)},{id:"add-product-addon",title:this.sandbox.translate("products.add-product-addon"),callback:h.bind(this,e)},{id:"add-product-set",title:this.sandbox.translate("products.add-product-set"),callback:h.bind(this,f)}]},{id:"workflow",icon:"husky-deactivated",type:"select",position:30,disabled:!0,items:[{id:"active",title:this.sandbox.translate("product.workfow.set.active"),callback:i.bind(this)},{id:"inactive",title:this.sandbox.translate("product.workfow.set.inactive"),callback:j.bind(this)}]}]},m=function(a){this.sandbox.emit("sulu.products.load",a,b.getUser().locale)};return{view:!0,layout:{content:{width:"max"}},header:function(){return{title:"pim.products.title",noBack:!0,breadcrumb:[{title:"navigation.pim"},{title:"pim.products.title"}]}},templates:["/admin/product/template/product/list"],initialize:function(){this.render(),k.call(this)},renderGrid:function(){var b=l.call(this),c=a.get("product.toolbar.extension");this.sandbox.dom.html(this.$el,this.renderTemplate("/admin/product/template/product/list")),c&&b.push.apply(b,c),this.sandbox.sulu.initListToolbarAndList.call(this,"productsFields","/admin/api/products/fields",{el:this.$find("#list-toolbar-container"),instanceName:g.toolbarInstanceName,parentTemplate:"default",inHeader:!0,template:b,groups:[{id:1,align:"left"},{id:2,align:"right"},{id:3,align:"left"}]},{el:this.sandbox.dom.find("#products-list",this.$el),url:"/admin/api/products?flat=true&status_id="+a.get("product.list.statuses.ids"),resultKey:"products",searchInstanceName:"productsToolbar",searchFields:["name","number","supplier"],instanceName:g.datagridInstanceName,actionCallback:m.bind(this)},"products","#products-list-info")},render:function(){this.renderGrid()}}});