define([],function(){"use strict";var a={discount:0,currency:"EUR",taxRate:.2,locale:"en",unit:"pc"},b={invalidInputTranslation:"products.price-calculation.invalid.input"},c=function(a,b){return a.dom.isNumeric(b)?(b=parseFloat(b),!(isNaN(b)||!(b>=0))):!1},d=function(d,e){if(c(d,e))return parseFloat(e)/100;if(e)throw d.logger.error("Invalid argument for tax rtae!",e),new Error(d.translate(b.invalidInputTranslation));return a.taxRate},e=function(a,d){if(c(a,d)&&parseFloat(d)<=100)return parseFloat(d)/100;if(d)throw a.logger.error("Invalid argument for discount!",d),new Error(a.translate(b.invalidInputTranslation));return parseFloat(b.discount)},f=function(b){return b?b:a.currency},g=function(b){return b?b:a.unit},h=function(b){return b?b:a.locale},i=function(a){return"en"!==a},j=function(a,b,d,e,f){return c(a,b)&&c(a,d)&&c(a,e)&&!(parseFloat(e)>100)&&c(a,f)?!0:(a.logger.error("Invalid parameter(s) for price calculation!"),!1)},k=function(a,b){var c,f,g,h,i=0,k={taxes:{},netPrice:0,grossPrice:0};try{for(c in b){if(!j(a,b[c].price,b[c].tax,b[c].discount,1))return null;f=b[c],g=e(a,f.discount),h=parseFloat(f.price),h*=f.quantity,g&&(h-=h*g),i=h*d(a,f.tax),i>0&&(k.taxes[f.tax]?k.taxes[f.tax]+=i:k.taxes[f.tax]=i),k.netPrice+=h,k.grossPrice+=h+i}return k}catch(l){return null}};return{getFormattedGrossPrice:function(a,c,e,g){if(!j(a,c,g,0,0))return a.translate(b.invalidInputTranslation);var k,l;try{return c=parseFloat(c),g=d(a,g),e=f(e),l=h(a.globalize.getLocale()),k=c+c*g,this.getFormattedNumberWithAddition(a,k,e,i(l))}catch(m){return a.translate(b.invalidInputTranslation)}},getFormattedNetPrice:function(a,c,e,g){if(!j(a,c,g,0,0))return a.translate(b.invalidInputTranslation);var k,l;return c=parseFloat(c),g=d(a,g),e=f(e),l=h(a.globalize.getLocale()),k=c-c*g,this.getFormattedNumberWithAddition(a,k,e,i(l))},getFormattedAmountAndUnit:function(a,d,e){return c(a,d)?(e=g(e),this.getFormattedNumberWithAddition(a,d,e,!0)):(a.logger.error("Invalid parameter in getFormattedAmountAndUnit!"),a.translate(b.invalidInputTranslation))},getFormattedNumberWithAddition:function(a,b,c,d){var e=a.numberFormat(b,"n");return d?e+" "+c:c+""+e},getTotalPrice:function(a,c,g,k,l,m,n){if(!j(a,c,m,k,l))return a.translate(b.invalidInputTranslation);var o,p;try{c=parseFloat(c),l=parseFloat(l),m=d(a,m),k=e(a,k),g=f(g),p=h(a.globalize.getLocale())}catch(q){return a.translate(b.invalidInputTranslation)}return n||(c-=c*m),o=c*l,o-=o*k,this.getFormattedNumberWithAddition(a,o,g,i(p))},getTotalPricesAndTaxes:function(a,b){return b?k.call(this,a,b):null}}});