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

mindplot.StandaloneActionDispatcher = new Class(/** @lends StandaloneActionDispatcher */{
    Extends: mindplot.ActionDispatcher,

    initialize: function (designer) {
        this._designer = designer;
    },

    /** */
    shrinkBranch: function (topicsIds, collapse) {
        $assert(topicsIds, "topicsIds can not be null");
        _.each(this.findTopics(topicsIds), function (topic) {
            topic.setChildrenShrunken(collapse);
        });
    },

    /** */
    findTopics: function (topicsIds) {
        $assert($defined(topicsIds), "topicsIds can not be null");
        if (!(topicsIds instanceof Array)) {
            topicsIds = [topicsIds];
        }

        var designerTopics = this._designer.getModel().getTopics();
        var result = designerTopics.filter(function (topic) {
            return topicsIds.contains(topic.getId());
        });

        if (result.length != topicsIds.length) {
            var ids = designerTopics.map(function (topic) {
                return topic.getId();
            });
            $assert(result.length == topicsIds.length, "Could not find topic. Result:" + result + ", Filter Criteria:" +
topicsIds + ", Current Topics: [" + ids + "]");
        }
        return result;
    },
});


