var core={};$defined=function(obj){return(obj!=undefined)
};
$assert=function(assert,message){if(!$defined(assert)||!assert){logStackTrace();
console.log(message);
throw new Error(message)
}};
Math.sign=function(value){return(value>=0)?1:-1
};
function logStackTrace(exception){if(!$defined(exception)){try{throw Error("Unexpected Exception")
}catch(e){exception=e
}}var result="";
if(exception.stack){result=exception.stack
}else{if(window.opera&&exception.message){result=exception.message
}else{result=exception.sourceURL+": "+exception.line+"\n\n";
var currentFunction=arguments.callee.caller;
while(currentFunction){var fn=currentFunction.toString();
result=result+"\n"+fn;
currentFunction=currentFunction.caller
}}}window.errorStack=result;
return result
}if(!window.console){console={log:function(e){}}
};core.Utils={};
core.Utils.innerXML=function(node){if($defined(node.innerXML)){return node.innerXML
}else{if($defined(node.xml)){return node.xml
}else{if($defined(XMLSerializer)){return(new XMLSerializer()).serializeToString(node)
}}}};
core.Utils.createDocument=function(){var doc=null;
if($defined(window.ActiveXObject)){var progIDs=["Msxml2.DOMDocument.6.0","Msxml2.DOMDocument.3.0"];
for(var i=0;
i<progIDs.length;
i++){try{doc=new ActiveXObject(progIDs[i]);
break
}catch(ex){}}}else{if(window.document.implementation&&window.document.implementation.createDocument){doc=window.document.implementation.createDocument("","",null)
}}$assert(doc,"Parser could not be instantiated");
return doc
};Options = new Class({

    setOptions: function () {
        var options = this.options = Object.merge.apply(null, [{}, this.options].append(arguments));
        if (this.addEvent) for (var option in options) {
            if (typeOf(options[option]) != 'function' || !(/^on[A-Z]/).test(option)) continue;
            this.addEvent(option, options[option]);
            delete options[option];
        }
        return this;
    }

});var BootstrapDialog = new Class({
    Implements: Options,

    options: {
        cancelButton: false,
        closeButton: false,
        acceptButton: true,
        removeButton:false,
        errorMessage: false,
        onEventData:{}
    },

    initialize: function (title, options) {
        this.setOptions(options);
        this.options.onEventData.dialog = this;
        this._native = $('<div class="modal fade" tabindex="-1"></div>').append('<div class="modal-dialog"></div>');
        var content = $('<div class="modal-content"></div>');
        var header = this._buildHeader(title);
        if (header) {
            content.append(header);
        }
        var body = $('<div class="modal-body"></div>');
        if(this.options.errorMessage){
            var error = $('<div class="alert alert-danger"></div>');
            error.hide();
            body.append(error);
        }
        content.append(body);
        var footer = this._buildFooter();
        if (footer) {
            content.append(footer);
        }
        this._native.find(".modal-dialog").append(content);
        this._native.on('hidden.bs.modal', function() {
            $(this).remove();
        });
        this._native.on('shown.bs.modal', this.onDialogShown);
    },

    _buildFooter: function() {
        var footer = null;
        if (this.options.acceptButton || this.options.removeButton || this.options.cancelButton) {
            footer = $('<div class="modal-footer" style="paddingTop:5;textAlign:center">');
        }
        if (this.options.acceptButton) {
            this.acceptButton = $('<button type="button" class="btn btn-primary" id="acceptBtn" data-dismiss="modal">'+ $msg('ACCEPT') + '</button>');
            footer.append(this.acceptButton);
            this.acceptButton.unbind('click').on("click",this.options.onEventData, this.onAcceptClick)
        }
        if (this.options.removeButton) {
            this.removeButton = $('<button type="button" class="btn btn-secondary" id="removeBtn" data-dismiss="modal">'+ $msg('REMOVE') +'</button>');
            footer.append(this.removeButton);
            this.removeButton.on('click', this.options.onEventData, this.onRemoveClick);
        }
        if (this.options.cancelButton) {
            footer.append('<button type="button" class="btn btn-secondary" data-dismiss="modal">'+ $msg('CANCEL') +'</button>');
        }
        return footer;
    },

    _buildHeader: function(title) {
        var header = null;
        if (this.options.closeButton || title) {
            header = $('<div class="modal-header"></div>');
        }
        if (this.options.closeButton) {
            header.append(
                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'
            );
        }
        if (title) {
            header.append('<h2 class="modal-title">' + title + '</h2>');
        }
        return header;
    },

    onAcceptClick: function(event) {
        throw "Unsupported operation";
    },

    onDialogShown: function() {},
    onRemoveClick: function(event) {
        throw "Unsupported operation";
    },

    show: function () {
        this._native.modal();
    },

    setContent: function(content) {
        var modalBody = this._native.find('.modal-body');
        modalBody.append(content);
    },

    css: function(options){
        this._native.find('.modal-dialog').css(options);
    },

    close: function() {
        this._native.modal('hide');
    },

    alertError: function(message){
        this._native.find('.alert-danger').text(message);
        this._native.find('.alert-danger').show();
    },

    cleanError: function(){
        this._native.find('.alert-danger').hide();
    }
});
BootstrapDialog.Request = new Class({

    Extends: BootstrapDialog,

    initialize: function(url, title, options) {
        this.parent(title, options);
        this.requestOptions = {};
        this.requestOptions.cache = false;
        var me = this;
        this.requestOptions.fail = function(xhr) {
            // Intercept form requests ...
            console.log("Failure:");
            console.log(xhr);
        };

        this.requestOptions.success = function() {
            // Intercept form requests ...
            var forms = me._native.find('form');
            _.each(forms, function(form) {
                $(form).on('submit', function(event) {
                    // Intercept form ...
                    me.requestOptions.url = form.action;
                    me.requestOptions.method = form.method ? form.method : 'post';
                    $.ajax(me.requestOptions);
                    event.stopPropagation();
                    return false;
                });
            });
        };

        this._native.find('.modal-body').load(url, function () {
            me.acceptButton.unbind('click').click(function () {
                submitDialogForm();
            });
            me._native.on('hidden.bs.modal', function () {
                $(this).remove();
            });
            me.show();
        });
    },

    onDialogShown: function() {
        if (typeof(onDialogShown) == "function") {
            onDialogShown();
        }
    }


});
