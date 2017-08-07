# BEWARE ! Makefiles require the use of hard tabs

OUT_MINDLPOT_JS_BUNDLE := mindplot-bundle.js
OUT_VENDOR_JS_BUNDLE := vendor-bundle.js

.PHONY: all clean

all: $(OUT_MINDLPOT_JS_BUNDLE) $(OUT_VENDOR_JS_BUNDLE)
	@:

$(OUT_MINDLPOT_JS_BUNDLE): mindplot/files-order.txt mindplot/*.js
	cat $$(cat $<) > $@

$(OUT_VENDOR_JS_BUNDLE): libraries/files-order.txt libraries/*.js
	cat $$(cat $<) > $@

clean:
	@$(RM) $(OUT_MINDLPOT_JS_BUNDLE) $(OUT_VENDOR_JS_BUNDLE)
