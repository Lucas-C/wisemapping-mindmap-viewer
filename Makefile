# BEWARE ! Makefiles require the use of hard tabs

OUT_JS_BUNDLE := mindmap-viewer-bundle.js

.PHONY: all clean

all: $(OUT_JS_BUNDLE)
	@:

$(OUT_JS_BUNDLE): core-utils.js */files-order.txt libraries/*.js $(web2d mindplot/**/*.js) $(wildcard mindplot/**/*.js) main.js
	cat $$(cat libraries/files-order.txt) core-utils.js $$(cat web2d/files-order.txt mindplot/files-order.txt) main.js > $@

clean:
	@$(RM) $(OUT_JS_BUNDLE)
