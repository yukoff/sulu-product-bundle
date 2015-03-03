define(["config"],function(a){"use strict";var b={product:1,"product-with-variants":2,"product-addon":3,"product-set":4},c="#product-form",d=60,e={supplierId:"#supplierField",autocompleteSupplierInstanceName:"supplier"};return{name:"Sulu Product Form",view:!0,templates:["/admin/product/template/product/form"],initialize:function(){this.saved=!0,this.status=this.options.data?this.options.data.status:a.get("product.status.active"),this.initializeValidation(),this.bindDOMEvents(),this.bindCustomEvents(),this.setHeaderBar(!0),this.render(),this.listenForChange()},bindDOMEvents:function(){},bindCustomEvents:function(){this.sandbox.on("product.state.change",function(a){this.options.data&&this.options.data.status&&this.options.data.status.id===a||(this.status={id:a},this.setHeaderBar(!1))},this),this.sandbox.on("sulu.header.toolbar.save",function(){this.save()}.bind(this)),this.sandbox.on("sulu.header.toolbar.delete",function(){this.sandbox.emit("sulu.product.delete",this.sandbox.dom.val("#id"))}.bind(this)),this.sandbox.on("sulu.products.saved",function(a){this.options.data.id=a,this.options.data.status=this.status,this.setHeaderBar(!0),this.setHeaderInformation()},this),this.sandbox.on("sulu.header.back",function(){this.sandbox.emit("sulu.products.list")},this),this.sandbox.on("sulu.header.initialized",function(){this.setHeaderInformation()},this)},initializeValidation:function(){this.sandbox.form.create(c)},save:function(){if(this.sandbox.form.validate(c)){var a=this.sandbox.form.getData(c);""===a.id&&delete a.id,a.status=this.status,!a.type&&this.options.productType&&(a.type={id:b[this.options.productType]}),a.supplier={id:this.sandbox.dom.attr("#"+e.autocompleteSupplierInstanceName,"data-id")},this.sandbox.emit("sulu.products.save",a)}},render:function(){this.sandbox.dom.html(this.$el,this.renderTemplate("/admin/product/template/product/form")),this.setHeaderInformation(),this.initSupplierAutocomplete(),this.initForm(this.options.data)},initForm:function(a){var b=this.sandbox.form.create(c);b.initialized.then(function(){this.setFormData(a)}.bind(this))},setFormData:function(a){this.sandbox.form.setData(c,a).then(function(){this.sandbox.start(c)}.bind(this)).fail(function(a){this.sandbox.logger.error("An error occured when setting data!",a)}.bind(this))},initSupplierAutocomplete:function(){var b=a.get("sulucontact.components.autocomplete.default.account");b.el=e.supplierId,b.value=this.options.data.supplier?this.options.data.supplier:"",b.instanceName=e.autocompleteSupplierInstanceName,b.remoteUrl+="type=3",this.sandbox.start([{name:"auto-complete@husky",options:b}])},setHeaderInformation:function(){var a="pim.product.title",b=[{title:"navigation.pim"},{title:"pim.products.title"}];this.options.data&&this.options.data.name&&(a=this.options.data.name),a=this.sandbox.util.cropTail(a,d),this.sandbox.emit("sulu.header.set-title",a),b.push(this.options.data&&this.options.data.number?{title:"#"+this.options.data.number}:{title:"pim.product.title"}),this.sandbox.emit("sulu.header.set-breadcrumb",b)},setHeaderBar:function(a){if(a!==this.saved){var b=this.options.data&&this.options.data.id?"edit":"add";this.sandbox.emit("sulu.header.toolbar.state.change",b,a,!0)}this.saved=a},listenForChange:function(){this.sandbox.dom.on("#product-form","change",function(){this.setHeaderBar(!1)}.bind(this),"select"),this.sandbox.dom.on("#product-form","keyup",function(){this.setHeaderBar(!1)}.bind(this),"input, textarea"),this.sandbox.on("sulu.content.changed",function(){this.setHeaderBar(!1)}.bind(this)),this.sandbox.on("husky.select.status.selected.item",function(){this.setHeaderBar(!1)}.bind(this)),this.sandbox.on("husky.select.orderUnit.selected.item",function(){this.setHeaderBar(!1)}.bind(this)),this.sandbox.on("husky.select.contentUnit.selected.item",function(){this.setHeaderBar(!1)}.bind(this))}}});