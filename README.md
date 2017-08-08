Simple web mindmap renderer.

Fork of https://bitbucket.org/wisemapping/wisemapping-open-source, inspired by https://framagit.org/framasoft/framindmap


# Demo

https://chezsoi.org/lucas/mindmap/mindmap-viewer


# Usage

Once the JS bundle is generated, any static files web server will do the job.
E.g. with Python:

    make
    python3 -m http.server  # then open http://localhost:8000/?optional_mindmap_name

Where `optional_mindmap_name.xml` must be in `samples`.

You can create those XML files from simple indented Markdown files with this Python script: https://github.com/Lucas-C/linux_configuration/tree/master/languages/python/mindmaps


# Developpement

Using [livereload](https://github.com/lepture/python-livereload) (do not forget to define the `$BROWSER` env variable, or else `lynx` may fire up):

    livereload --open-url-delay 1 --target mindmap-viewer-bundle.js . & watch -n 1 make


<!--
TODO:
- `&solarize_theme`: `ag -Q 'rgb(82,92,97)'`
- expand the mindmap at start
- `Synchronous XMLHttpRequest` warning comes from the way XML mindmaps are loaded in LocalStorageManager.js
- restore unit tests from repo history
-->
