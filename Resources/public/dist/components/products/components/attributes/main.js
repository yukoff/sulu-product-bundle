define(["config","text!suluproduct/components/products/components/attributes/overlay-content.html"],function(a,b){"use strict";var c="#product-attributes-form",d="product-attribute-list-toolbar",e="product-attribute-datagrid",f="product-attribute-overlay",g="product-attribute-select",h="product.attribute.type.text",i=null,j={ADD:1,DELETE:2,UPDATE:3},k=function(){this.sandbox.on("sulu.toolbar.delete",function(){this.sandbox.emit("sulu.product.delete",this.options.data.id)}.bind(this)),this.sandbox.on("product.state.change",function(a){this.options.data&&this.options.data.attributes.status&&this.options.data.attributes.status.id===a.id||(this.status=a,this.options.data.attributes.status=this.status,l.call(this,!1))},this),this.sandbox.on("sulu.toolbar.save",function(){this.sendData={},this.sendData.status=this.status,this.sendData.id=this.options.data.id,o.call(this)},this),this.sandbox.on("sulu.products.saved",function(a){var b=a.attributes;if(a.action===j.ADD){var c=_.findWhere(b,{attributeId:a.attributeIdAdded});this.sandbox.emit("husky.datagrid."+e+".record.add",{attributeId:c.attributeId,attributeName:c.attributeName,attributeValueName:c.attributeValueName})}else a.action===j.DELETE?$.each(a.attributeIdsDeleted,function(a,b){this.sandbox.emit("husky.datagrid."+e+".record.remove",b)}.bind(this)):a.action===j.UPDATE&&this.sandbox.emit("husky.datagrid."+e+".records.set",b);l.call(this,!0),this.options.data.attributes.status=this.status},this),this.sandbox.on("husky.datagrid."+e+".number.selections",function(a){var b=a>0?"enable":"disable";this.sandbox.emit("husky.toolbar."+d+".item."+b,"delete",!1)},this)},l=function(a){a!==this.saved&&(a?this.sandbox.emit("sulu.header.toolbar.item.disable","save",!0):this.sandbox.emit("sulu.header.toolbar.item.enable","save",!1)),this.saved=a},m=function(){i=null;var a=this.sandbox.dom.createElement(this.sandbox.util.template(b,{translate:this.sandbox.translate}));return this.sandbox.dom.append(this.$el,a),a},n=function(){var a="api/attributes?locale="+this.options.locale,b=$.getJSON(a,function(a){this.attributeTypes=[],$.each(a._embedded.attributes,function(a,b){var c={id:b.id,name:b.name};b.type.name===h&&this.attributeTypes.push(c)}.bind(this))}.bind(this));b.done(function(){var a=this.sandbox.dom.createElement("<div>");this.sandbox.dom.append(this.$el,a),this.sandbox.start([{name:"overlay@husky",options:{el:a,supportKeyInput:!1,title:this.sandbox.translate("product.attribute.overlay.title"),skin:"normal",openOnStart:!0,removeOnClose:!0,instanceName:f,data:m.call(this),okCallback:p.bind(this)}}])}.bind(this)),b.fail(function(){console.log("Error retrieving attributes from server")}.bind(this)),b.complete(function(){var a=[];this.attributeTypes.length>0&&"object"==typeof this.attributeTypes[0]&&"string"==typeof this.attributeTypes[0].name&&(i=this.attributeTypes[0].id,a.push(this.attributeTypes[0].name));var b={el:"#selectBox",instanceName:g,multipleSelect:!1,defaultLabel:this.sandbox.translate("product.attribute.overlay.defaultlabel"),preSelectedElements:a,valueName:"name",isNative:!0,data:this.attributeTypes};this.sandbox.start([{name:"select@husky",options:b}]),this.sandbox.on("husky.select."+g+".selected.item",function(a){i=parseInt(a)})}.bind(this))},o=function(){this.saved=!1,this.sandbox.emit("sulu.products.save",this.sendData)},p=function(){if(i){this.sendData={};var a=this.sandbox.dom.val("#attribute-name"),b=this.options.data.attributes.attributes,c=_.findWhere(b,{attributeId:i});if(c)c.attributeValueName=a,this.sendData.action=j.UPDATE;else{var d={attributeId:i,attributeValueName:a};b.push(d),this.sendData.action=j.ADD}this.sendData.attributeIdAdded=i,this.sendData.attributes=b,this.sendData.status=this.status,this.sendData.id=this.options.data.attributes.id,o.call(this)}},q=function(){this.sandbox.emit("husky.datagrid."+e+".items.get-selected",function(a){var b=this.options.data.attributes.attributes;this.sendData={};var c=[];_.each(a,function(a,d,e){var f=_.findWhere(b,{attributeId:a});b=_.without(b,f),c.push(a)}),this.sendData.attributeIdsDeleted=c,this.sendData.attributes=b,this.sendData.status=this.status,this.sendData.id=this.options.data.id,this.sendData.action=j.DELETE,o.call(this)}.bind(this))},r=function(){var a={el:"#product-attribute-list",instanceName:e,idKey:"attributeId",resultKey:"attributes",matchings:[{name:"attributeName",content:this.sandbox.translate("product.attribute.name")},{name:"attributeValueName",content:this.sandbox.translate("product.attribute.value")}],viewOptions:{table:{type:"checkbox",badges:[{column:"attributeName",callback:function(a,b){return a.attributeLocale&&a.attributeLocale==a.fallbackLocale&&a.attributeLocale!=this.options.locale?(b.title=a.attributeLocale,b):!1}.bind(this)},{column:"attributeValueName",callback:function(a,b){return a.attributeValueLocale&&a.attributeValueLocale==a.fallbackLocale&&a.attributeValueLocale!=this.options.locale?(b.title=a.attributeValueLocale,b):!1}.bind(this)}]}},data:this.options.data.attributes};this.sandbox.start([{name:"datagrid@husky",options:a}]),this.sandbox.start([{name:"toolbar@husky",options:{el:"#product-attribute-selection-toolbar",instanceName:d,small:!1,buttons:[{id:"add",icon:"plus-circle",callback:n.bind(this)},{id:"delete",icon:"trash-o",disabled:!0,callback:q.bind(this)}]}}])},s=function(){this.sandbox.start(c),r.call(this)};return{name:"Sulu Product Attributes View",templates:["/admin/product/template/product/attributes"],render:function(){this.sandbox.dom.html(this.$el,this.renderTemplate("/admin/product/template/product/attributes")),s.call(this)},initialize:function(){k.call(this),this.options.data?this.status=this.options.data.attributes.status:this.status=a.get("product.status.inactive"),this.sandbox.emit("product.state.change",this.status),this.render(),l.call(this,!0)}}});