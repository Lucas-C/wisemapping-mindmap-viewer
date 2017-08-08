/*
 *    Copyright [2015] [wisemapping]
 *
 *   Licensed under WiseMapping Public License, Version 1.0 (the "License").
 *   It is basically the Apache License, Version 2.0 (the "License") plus the
 *   "powered by wisemapping" text requirement on every single page;
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the license at
 *
 *       http://www.wisemapping.org/license
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */


/*
 * Disclaimer: this global variable is a temporary workaround to Mootools' Browser class
 * We need to avoid browser detection and replace it with feature detection,
 * jquery recommends: http://www.modernizr.com/
 */

Browser = {
    firefox: window.globalStorage,
    ie: document.all && !window.opera,
    ie6: !window.XMLHttpRequest,
    ie7: document.all && window.XMLHttpRequest && !XDomainRequest && !window.opera,
    ie8: document.documentMode == 8,
    ie11: document.documentMode == 11,
    opera: Boolean(window.opera),
    chrome: Boolean(window.chrome),
    safari: window.getComputedStyle && !window.globalStorage && !window.opera,
    Platform: {
        mac: navigator.platform.indexOf('Mac') != -1
    }
};

editor = {};
editor.WaitDialog = new Class({
    initialize: function () {
        this.panel = this._buildPanel();
    },

    _buildPanel: function () {
        var result = $('#load');
        var content = result.find('.modal-content');
        var winH = $(window).height();
        //Set the popup window to center
        content.css('margin-top', winH / 2 - content.height() / 2);
        return result;
    },

    show: function () {
        this.panel.modal({
            backdrop: 'static'
        });
    },

    close: function () {
        this.panel.modal('hide');
    }
});

function displayMindmap(options) {
    waitDialog = new editor.WaitDialog();
    waitDialog.show();

    var container = $("#" + options.container);
    $assert(container, 'container could not be null');

    if (typeof(options.readOnly) != 'undefined') { // anyway, ultimately, I want to get rid of any non-readOnly feature
        options.readOnly = true;
    }

    // Register load events ...
    var designer = new mindplot.Designer(options, container);
    designer.addEvent('loadSuccess', function () {
        window.waitDialog.close();
        window.waitDialog = null;
        window.mindmapLoadReady = true;
    });

    // Configure default persistence manager ...
    var persistence;
    if (options.persistenceManager) {
        if (options.persistenceManager instanceof String) {
            persistence = eval("new " + options.persistenceManager + "()");
        } else {
            persistence = options.persistenceManager;
        }
    } else {
        persistence = new mindplot.LocalStorageManager("samples/{id}.xml");
    }
    mindplot.PersistenceManager.init(persistence);

    var persistence = mindplot.PersistenceManager.getInstance();
    persistence.discardChanges(options.mapId);  // Removing mindmap from local storage to avoid caching issues
    var mindmap = persistence.load(options.mapId);

    designer.loadMap(mindmap);
}