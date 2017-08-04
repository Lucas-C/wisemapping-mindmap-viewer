# BEWARE ! Makefiles require the use of hard tabs

OUT_JS_BUNDLE := mindmap-viewer/mindplot-bundle.js

.PHONY: all clean

all: $(OUT_JS_BUNDLE)
	@:

$(OUT_JS_BUNDLE): mindplot-ordered-files.txt mindplot/*.js
	cat $$(cat $<) > $@

clean:
	@$(RM) $(OUT_JS_BUNDLE)
