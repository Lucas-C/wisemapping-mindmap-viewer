Simple web mindmap renderer.

Fork of https://bitbucket.org/wisemapping/wisemapping-open-source, inspired by https://framagit.org/framasoft/framindmap

Usage:

    make
    python3 -m http.server  # then open http://localhost:8000/mindmap-viewer/?optional_mindmap_name

`optional_mindmap_name.xml` must be in `mindmap-viewer/samples`.

You can create those XML files from simple indented Markdown files with this: https://github.com/Lucas-C/linux_configuration/tree/master/languages/python/mindmaps

<!--
TODO:
- get rid of symlinks
- `&solarize_theme`: `ag -Q 'rgb(82,92,97)'`
- expand the mindmap at start
- `Synchronous XMLHttpRequest` warning comes from the way XML mindmaps are loaded in LocalStorageManager.js
-->
