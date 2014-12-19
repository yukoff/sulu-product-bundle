/*
 * This file is part of the Sulu CMS.
 *
 * (c) MASSIVE ART WebServices GmbH
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

define(['config'], function(Config) {

    'use strict';

    return {

        /**
         * initializes the header toolbar
         * @param sandbox
         * @param locale
         * @param status
         */
        initToolbar: function(sandbox, locale, status) {
            this.sandbox = sandbox;
            this.sandbox.once('sulu.header.initialized', function() {
                var items = this.getToolbarItems(locale, status);
                this.sandbox.emit('sulu.header.set-toolbar', {
                    data: items,
                    groups: [
                        {id: 'left', align: 'left'},
                        {id: 'right', align: 'right'}
                    ]});
            }, this);
        },

        resetToolbar: function(sandbox, locale, status) {
            this.sandbox = sandbox;

            var items = this.getToolbarItems(locale, status);
            this.sandbox.emit('sulu.header.set-toolbar', {
                data: items,
                groups: [
                    {id: 'left', align: 'left'},
                    {id: 'right', align: 'right'}
                ]});

        },

        getLanguageChanger: function() {
            var items = [], i, length;

            for (i = -1, length = this.sandbox.sulu.locales.length; ++i < length;) {
                // generate dropdown-items
                items.push({
                    title: this.sandbox.sulu.locales[i],
                    locale: this.sandbox.sulu.locales[i]
                });
            }

            return items;
        },

        setProductActive: function() {
            this.sandbox.emit(
                'product.state.change',
                Config.get('product.status.active').id
            );
        },

        setProductInactive: function() {
            this.sandbox.emit(
                'product.state.change',
                Config.get('product.status.inactive').id
            );
        },

        getToolbarItems: function(locale, status) {
            var statusTitle,
                statusIcon;

            // new product
            if (!status) {
                statusTitle = this.sandbox.translate(Config.get('product.status.active').key);
                statusIcon = 'husky-publish';
            } else if (status.id === Config.get('product.status.active').id) {
                statusTitle = this.sandbox.translate(Config.get('product.status.active').key);
                statusIcon = 'husky-publish';
            } else {
                statusTitle = this.sandbox.translate(Config.get('product.status.inactive').key);
                statusIcon = 'husky-test';
            }

            return [
                {
                    id: 'save-button',
                    icon: 'floppy-o',
                    iconSize: 'large',
                    class: 'highlight',
                    position: 1,
                    group: 'left',
                    disabled: true,
                    callback: function() {
                        this.sandbox.emit('sulu.header.toolbar.save');
                    }.bind(this)
                },
                {
                    icon: 'gear',
                    iconSize: 'large',
                    group: 'left',
                    id: 'options-button',
                    position: 30,
                    items: [
                        {
                            title: this.sandbox.translate('toolbar.delete'),
                            callback: function() {
                                this.sandbox.emit('sulu.header.toolbar.delete');
                            }.bind(this)
                        }
                    ]
                },
                {
                    id: 'workflow',
                    icon: statusIcon,
                    title: statusTitle,
                    type: 'select',
                    group: 'left',
                    position: 30,
                    items: [
                        {
                            id: 'inactive',
                            icon: 'husky-test',
                            title: this.sandbox.translate('product.workfow.set.inactive'),
                            callback: this.setProductInactive.bind(this)
                        },
                        {
                            id: 'active',
                            icon: 'husky-publish',
                            title: this.sandbox.translate('product.workfow.set.active'),
                            callback: this.setProductActive.bind(this)
                        }
                    ]
                },
                {
                    id: 'language',
                    iconSize: 'large',
                    group: 'right',
                    position: '99',
                    type: 'select',
                    class: 'highlight-white',
                    title: locale,
                    items: this.getLanguageChanger(),
                    itemsOption: {
                        markable: true,
                        callback: function(item) {
                            this.sandbox.emit('sulu.header.language-changed', item.locale);
                        }.bind(this)
                    }
                }
            ];
        }
    };
});