/*
 * This file is part of the Sulu CMS.
 *
 * (c) MASSIVE ART WebServices GmbH
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

define([], function () {
    'use strict';

    var defaults = {
            translations: {
                addProducts: 'sulu.products.add-products',
                productName: 'sulu.products.productName'
            }
        },

        templates = {
            productsDataGrid: function () {
                return [
                    '<div id="', this.options.dataGridInstanceName, '" />'
                ].join('');
            }
        },

        eventNamespace = 'sulu.products.products-overlay.',

        /** returns normalized event names */
        createEventName = function (postFix) {
            return eventNamespace + (this.options.instanceName ? this.options.instanceName + '.' : '') + postFix;
        },

        /**
         *
         * @event sulu.product.products-overlay.open
         * @description Opens the overlay
         */
        OPEN = function () {
            return createEventName.call(this, 'open');
        },

        /**
         * @event sulu.product.products-overlay.add
         * @description Emits an event that the add button has been pressed
         */
        ADD = function () {
            return createEventName.call(this, 'add');
        },

        initializeOverlay = function () {
            bindCustomEvents.call(this);

            var $el = this.sandbox.dom.createElement('<div/>');
            this.sandbox.dom.append(this.$el, $el);

            this.sandbox.start([
                {
                    name: 'overlay@husky',
                    options: {
                        el: $el,
                        instanceName: this.options.instanceName,
                        slides: [
                            {
                                title: this.sandbox.translate(this.options.translations.addProducts),
                                data: templates.productsDataGrid.call(this)
                            }
                        ]
                    }
                }
            ]);
        },

        initializeDataGrid = function () {
            this.sandbox.start([
                {
                    name: 'datagrid@husky',
                    options: {
                        el: '#' + this.options.dataGridInstanceName,
                        instanceName: this.options.dataGridInstanceName,
                        url: '/admin/api/products?flat=true',
                        resultKey: 'products',
                        pagination: false,
                        viewOptions: {
                            table: {
                                excludeFields: ['id'],
                                showHead: false,
                                cssClass: 'minimal',
                                selectItem: false
                            }
                        },
                        matchings: [
                            {
                                name: 'id'
                            },
                            {
                                name: 'name',
                                translation: this.options.translations.productName
                            }
                        ]
                    }
                }
            ]);
        },

        openOverlay = function () {
            this.sandbox.emit('husky.overlay.' + this.options.instanceName + '.open');
        },

        addProductVariant = function (id) {
            this.sandbox.emit(ADD.call(this), id, function(response) {
                this.sandbox.emit('husky.datagrid.' + this.options.dataGridInstanceName + '.record.remove', id);
                this.sandbox.emit('husky.datagrid.record.add', response);
            }.bind(this));
        },

        setPosition = function () {
            this.sandbox.emit('husky.overlay.' + this.options.instanceName + '.set-position');
        },

        bindCustomEvents = function () {
            this.sandbox.once('husky.overlay.' + this.options.instanceName + '.opened', function () {
                initializeDataGrid.call(this);
            }, this);

            this.sandbox.on(OPEN.call(this), function () {
                openOverlay.call(this);
            }, this);

            this.sandbox.on('husky.datagrid.' + this.options.dataGridInstanceName + '.item.click', function (id) {
                addProductVariant.call(this, id);
            }, this);

            this.sandbox.on('husky.datagrid.' + this.options.dataGridInstanceName + '.view.rendered', function() {
                setPosition.call(this);
            }, this);
        };

    return {
        initialize: function () {
            this.options = this.sandbox.util.extend({}, defaults, this.options);

            this.options.dataGridInstanceName = this.options.instanceName + '-datagrid';

            initializeOverlay.call(this);
        }
    };
});