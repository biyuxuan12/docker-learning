var http = require('http');
var fs = require("fs");
var marked = require('marked');
http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'html'});

    var data = fs.readFileSync('homeshare.md', 'utf-8');
    var htmlStr = marked(data.toString());
    var css = fs.readFileSync('github-markdown.css', 'utf-8');
    response.write('<!DOCTYPE html>' +
        '<html>' +
        '<head>' +
        '<meta charset="utf-8" />' +
        '<link rel="stylesheet" href="github-markdown.css">'+
        '<title>homework Sharing</title>' +
        '<style>'+
        css.toString()+
        '</style>'+
        '</head>' +
        '<body>' +
        '<article class="markdown-body">' +
        htmlStr +
        '</article>'+
        '</body>' +
        '</html>');
    response.end();
}).listen(8888);

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');
