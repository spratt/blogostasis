/******************************************************************************
* Copyright (c) 2011, Simon David Pratt <me@simondavidpratt.com>              *
*                                                                             *
* Permission to use, copy, modify, and/or distribute this software for        *
* any purpose with or without fee is hereby granted, provided that the        *
* above copyright notice and this permission notice appear in all             *
* copies.                                                                     *
*                                                                             *
* THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL               *
* WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED               *
* WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE            *
* AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL        *
* DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA          *
* OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER           *
* TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR            *
* PERFORMANCE OF THIS SOFTWARE.                                               *
******************************************************************************/
var blog = (function() {
    var ex = {};

    var getJSON = function(url,success_fn) {
	$.getJSON(url,{},function(data) {
	    success_fn(data);
	});
    };

    var getIndex = function(success_fn) {
	getJSON('index.json',function(data) {
	    ex.index = data;
	    success_fn();
	});
    };

    var parseLocation = function() {
	var url = location.href;
	if(url.lastIndexOf('#') == -1) {
	    return null;
	}
	return url.substr(1+url.lastIndexOf('#'),url.length);
    };

    var getPost = function(filename) {
	if(ex.index == undefined) return null;
	console.log(filename);
	getJSON(filename,function(data) {
	    $('#title').text(data.title);
	    $('#text').html(data.text);
	    $('#date').text(data.date);
	    $('#blurb').html(data.blurb);
	    var tags = $('#tags');
	    tags.empty();
	    for(var tag in data.tags) {
		tags.append(data.tags[tag] + ' ');
	    }
	});
    }

    var getLatest = function() {
	var filename = ex.index.posts[0];
	var href = location.href;
	if(href.indexOf('#') != -1) {
	    href = href.substring(0,href.indexOf('#'));
	}
	href += '#' + ex.index.posts_by_filename[filename].url;
	location.href = href;
    }

    $(window).hashchange(function() {
	var url = parseLocation();
	if(url in ex.index.posts_by_url)
	    getPost(ex.index.posts_by_url[parseLocation()]);
	else
	    getLatest();
    });
    
    $(window).load(function() {
	getIndex(function(){
	    if(parseLocation() == null) {
		getLatest();
	    } else $(window).hashchange();
	});
    });
    return ex;
})();