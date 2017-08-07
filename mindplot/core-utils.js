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

$defined = function(obj) {
    return obj != undefined;
};

$assert = function(assert,message) {
    if (!$defined(assert) || !assert) {
        logStackTrace();
        console.log(message);
        throw new Error(message)
    }
};

Math.sign = function(value) {
    return(value>=0)?1:-1
};

var core = {};
core.Utils={};
core.Utils.innerXML = function(node) {
    if ($defined(node.innerXML)) {
        return node.innerXML;
    } else {
        if ($defined(node.xml)) {
            return node.xml;
        } else {
            if ($defined(XMLSerializer)) {
                return (new XMLSerializer()).serializeToString(node);
            }
        }
    }
};
core.Utils.createDocument = function() {
    var doc = null;
    if ($defined(window.ActiveXObject)) {
        var progIDs = ["Msxml2.DOMDocument.6.0","Msxml2.DOMDocument.3.0"];
        for (var i=0; i<progIDs.length; i++) {
            try {
                doc = new ActiveXObject(progIDs[i]);
                break;
            } catch(ex) {
            }
        }
    } else {
        if (window.document.implementation && window.document.implementation.createDocument) {
            doc = window.document.implementation.createDocument("","",null);
        }
    }
    $assert(doc,"Parser could not be instantiated");
    return doc;
};

Options = new Class({
    setOptions: function () {
        var options = this.options = Object.merge.apply(null, [{}, this.options].append(arguments));
        if (this.addEvent) for (var option in options) {
            if (typeOf(options[option]) != 'function' || !(/^on[A-Z]/).test(option)) continue;
            this.addEvent(option, options[option]);
            delete options[option];
        }
        return this;
    }

});
