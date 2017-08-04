This is a fork of https://bitbucket.org/wisemapping/wisemapping-open-source intendend in only providing a simple web mindmap renderer.

Inspired by https://framagit.org/framasoft/framindmap

Usage:

    make
    python3 -m http.server  # then open http://localhost:8000/wise-editor/src/main/webapp/html/viewmode.html?optional_mindmap_name

`optional_mindmap_name.xml` must be in `wise-editor/src/main/webapp/samples`.

You can create those XML files from simple indented Markdown files with this: https://github.com/Lucas-C/linux_configuration/tree/master/languages/python/mindmaps

<!--
TODO:
- `&solarize_theme`: `ag -Q 'rgb(82,92,97)'`
- expand the mindmap at start
-->
