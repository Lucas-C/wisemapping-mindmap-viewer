# BEWARE ! Makefiles require the use of hard tabs

OUT_JS_BUNDLE := wise-editor/src/main/webapp/js/mindplot-bundle.js

.PHONY: all clean

all: $(OUT_JS_BUNDLE)
	@:

$(OUT_JS_BUNDLE): mindplot/src/main/javascript/*.js
	cd mindplot/src/main/javascript && cat $$(sed -n '/<includes>/,/<\/includes>/{/<includes>/d;/<\/includes>/d;p}' ../../../pom.xml | sed -e 's~$${basedir}~../../..~' -e 's~\s*<include>~~' -e 's~</include>$$~~') > ../../../../$@

clean:
	@$(RM) $(OUT_JS_BUNDLE)
