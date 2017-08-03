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

mindplot.widget.LinkIconTooltip = new Class({
    Extends:mindplot.widget.FloatingTip,

    initialize:function (linkIcon) {
        $assert(linkIcon, "linkIcon can not be null");
        var nativeElement = $(linkIcon.getImage()._peer._native);
        this.parent(nativeElement, {
            // Content can also be a function of the target element!
            content:this._buildContent(linkIcon),
            html:true,
            placement:'bottom',
            container: 'body',
            title: $msg('LINK'),
            trigger: "manual",
            template: '<div id="linkPopover" class="popover" onmouseover="$(this).mouseleave(function() {$(this).fadeOut(200); });" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
        });
    },

    _buildContent:function (linkIcon) {
        var result = $('<div></div>').css({
            padding:'5px',
            width:'100%'
        });

        var text = $('<div></div>').text("URL: " + linkIcon.getModel().getUrl())
        .css({
            'white-space':'pre-wrap',
            'word-wrap':'break-word'
        });
        result.append(text);

        var imgContainer = $('<div></div>')
        .css({
            width:'100%',
            'textAlign':'right',
            'padding-bottom':'5px',
            'padding-top':'5px'
        });

        var img = $('<img>')
            .prop("src","data:image/png;base64,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");

        img.css('padding', '5px');

        var link = $('<a></a>').attr({
            href:linkIcon.getModel().getUrl(),
            alt:'Open in new window ...',
            target:'_blank'
        });

        link.append(img);
        imgContainer.append(link);
        result.append(imgContainer);
        return result;
    }
});