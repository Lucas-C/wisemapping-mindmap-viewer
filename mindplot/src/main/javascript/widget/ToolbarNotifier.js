/*
 *    Copyright [2011] [wisemapping]
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

mindplot.widget.ToolbarNotifier = new Class({

    initialize : function() {
        this._container = $('headerNotifier');
        this._effect = new Fx.Elements(this._container, {
            onComplete: function() {
                this._container.setStyle('display', 'none');
            }.bind(this),
            link:'cancel',
            duration:8000,
            transition: Fx.Transitions.Expo.easeInOut
        });
    },

    logError : function(userMsg) {
        this.logMessage(userMsg, mindplot.widget.ToolbarNotifier.MsgKind.ERROR);
    },

    logMessage : function(msg) {
        $assert(msg, 'msg can not be null');
        this._container.set('text', msg);
        this._container.setStyle('display', 'block');

        this._effect.start({
            0: {
                opacity: [1,0]
            }
        });
        this._container.position({
            relativeTo: $('header'),
            position: 'upperCenter',
            edge: 'centerTop'
        });

    }

});

mindplot.widget.ToolbarNotifier.MsgKind = {
    INFO:1,
    WARNING:2,
    ERROR:3,
    FATAL:4
};

var toolbarNotifier = new mindplot.widget.ToolbarNotifier();
$notify = toolbarNotifier.logMessage.bind(toolbarNotifier);