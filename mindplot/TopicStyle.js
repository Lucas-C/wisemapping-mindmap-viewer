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
mindplot.TopicStyle = new Class({
    Static: {
        _getStyles: function (topic) {
            $assert(topic, "topic can not be null");

            var result;
            if (topic.isCentralTopic()) {
                result = mindplot.TopicStyle.STYLES.CENTRAL_TOPIC;
            } else {
                var targetTopic = topic.getOutgoingConnectedTopic();
                if ($defined(targetTopic)) {
                    if (targetTopic.isCentralTopic()) {
                        result = mindplot.TopicStyle.STYLES.MAIN_TOPIC;
                    } else {
                        result = mindplot.TopicStyle.STYLES.SUB_TOPIC;
                    }
                } else {
                    result = mindplot.TopicStyle.STYLES.ISOLATED_TOPIC;
                }
            }
            return result;
        },

        defaultText: function (topic) {
            var msgKey = this._getStyles(topic).msgKey;
            return $msg(msgKey);
        },

        defaultFontStyle: function (topic) {
            return this._getStyles(topic).fontStyle;
        },

        defaultBackgroundColor: function (topic) {
            return this._getStyles(topic).backgroundColor;
        },

        defaultBorderColor: function (topic) {
            return this._getStyles(topic).borderColor;
        },

        getInnerPadding: function (topic) {
            return this._getStyles(topic).innerPadding;
        },

        defaultShapeType: function (topic) {
            return this._getStyles(topic).shapeType;
        }

    }
});

if (!window.CENTRAL_TOPIC_STYLE) {
    window.CENTRAL_TOPIC_STYLE = {};
}
if (!window.CENTRAL_TOPIC_STYLE.fontStyle) {
    window.CENTRAL_TOPIC_STYLE.fontStyle = {};
}
if (!window.MAIN_TOPIC_STYLE) {
    window.MAIN_TOPIC_STYLE = {};
}
if (!window.MAIN_TOPIC_STYLE.fontStyle) {
    window.MAIN_TOPIC_STYLE.fontStyle = {};
}
if (!window.SUB_TOPIC_STYLE) {
    window.SUB_TOPIC_STYLE = {};
}
if (!window.SUB_TOPIC_STYLE.fontStyle) {
    window.SUB_TOPIC_STYLE.fontStyle = {};
}
if (!window.ISOLATED_TOPIC_STYLE) {
    window.ISOLATED_TOPIC_STYLE = {};
}
if (!window.ISOLATED_TOPIC_STYLE.fontStyle) {
    window.ISOLATED_TOPIC_STYLE.fontStyle = {};
}
mindplot.TopicStyle.STYLES =
{
    CENTRAL_TOPIC: {
        borderColor: window.CENTRAL_TOPIC_STYLE.borderColor || 'rgb(57,113,177)',
        backgroundColor: window.CENTRAL_TOPIC_STYLE.backgroundColor || 'rgb(80,157,192)',
        fontStyle: {
            font: window.CENTRAL_TOPIC_STYLE.fontStyle.font || "Verdana",
            size: window.CENTRAL_TOPIC_STYLE.fontStyle.size || 10,
            style: window.CENTRAL_TOPIC_STYLE.fontStyle.style || "normal",
            weight: window.CENTRAL_TOPIC_STYLE.fontStyle.weight || "bold",
            color: window.CENTRAL_TOPIC_STYLE.fontStyle.colors || "#ffffff"
        },
        msgKey: window.CENTRAL_TOPIC_STYLE.msgKey || 'CENTRAL_TOPIC',
        innerPadding: window.CENTRAL_TOPIC_STYLE.innerPadding || 11,
        shapeType: mindplot.model.TopicShape[window.CENTRAL_TOPIC_STYLE.shapeType || 'ROUNDED_RECT']
    },

    MAIN_TOPIC: {
        borderColor: window.MAIN_TOPIC_STYLE.borderColor || 'rgb(2,59,185)',
        backgroundColor: window.MAIN_TOPIC_STYLE.backgroundColor || 'rgb(224,229,239)',
        fontStyle: {
            font: window.CENTRAL_TOPIC_STYLE.fontStyle.font || "Arial",
            size: window.CENTRAL_TOPIC_STYLE.fontStyle.size || 8,
            style: window.CENTRAL_TOPIC_STYLE.fontStyle.style || "normal",
            weight: window.CENTRAL_TOPIC_STYLE.fontStyle.weight || "normal",
            color: window.CENTRAL_TOPIC_STYLE.fontStyle.color || "rgb(82,92,97)"
        },
        msgKey: window.MAIN_TOPIC_STYLE.msgKey || 'MAIN_TOPIC',
        innerPadding: window.MAIN_TOPIC_STYLE.innerPadding || 3,
        shapeType: mindplot.model.TopicShape[window.MAIN_TOPIC_STYLE.shapeType || 'LINE']

    },

    SUB_TOPIC: {
        borderColor: window.SUB_TOPIC_STYLE.borderColor || 'rgb(2,59,185)',
        backgroundColor: window.SUB_TOPIC_STYLE.backgroundColor || 'rgb(224,229,239)',
        fontStyle: {
            font: window.SUB_TOPIC_STYLE.fontStyle.font || "Arial",
            size: window.SUB_TOPIC_STYLE.fontStyle.size || 6,
            style: window.SUB_TOPIC_STYLE.fontStyle.style || "normal",
            weight: window.SUB_TOPIC_STYLE.fontStyle.weight || "normal",
            color: window.SUB_TOPIC_STYLE.fontStyle.color || "rgb(82,92,97)"
        },
        msgKey: window.SUB_TOPIC_STYLE.msgKey || 'SUB_TOPIC',
        innerPadding: window.SUB_TOPIC_STYLE.innerPadding || 3,
        shapeType: mindplot.model.TopicShape[window.SUB_TOPIC_STYLE.shapeType || 'LINE']
    },

    ISOLATED_TOPIC: {
        borderColor: window.ISOLATED_TOPIC_STYLE.borderColor || 'rgb(2,59,185)',
        backgroundColor: window.ISOLATED_TOPIC_STYLE.backgroundColor || 'rgb(224,229,239)',
        fontStyle: {
            font: window.ISOLATED_TOPIC_STYLE.fontStyle.font || "Verdana",
            size: window.ISOLATED_TOPIC_STYLE.fontStyle.size || 8,
            style: window.ISOLATED_TOPIC_STYLE.fontStyle.style || "normal",
            weight: window.ISOLATED_TOPIC_STYLE.fontStyle.weight || "normal",
            color: window.ISOLATED_TOPIC_STYLE.fontStyle.color || "rgb(82,92,97)"
        },
        msgKey: window.ISOLATED_TOPIC_STYLE.msgKey || 'ISOLATED_TOPIC',
        innerPadding: window.ISOLATED_TOPIC_STYLE.innerPadding || 4,
        shapeType: mindplot.model.TopicShape[window.ISOLATED_TOPIC_STYLE.shapeType || 'LINE']
    }
};