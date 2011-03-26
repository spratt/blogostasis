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
    //////////////////////////////////////////////////////////////////////
    // CONFIGURATION
    var BLOG_TITLE = 'My Bodacious Blog';
    var DELIMITER  = '?';

    //////////////////////////////////////////////////////////////////////
    // Functions
    var ex = {};
    ex.BLOG_TITLE = BLOG_TITLE;

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

    var removeHash = function(str) {
	var pos = str.indexOf('#');
	if(pos == -1) return str;
	return str.substr(0,pos);
    }

    var parseLocation = function() {
	var url = removeHash(location.href);
	var startPos = 1+url.lastIndexOf(DELIMITER);
	if(startPos == -1) {
	    return null;
	}
	console.log(url.substr(startPos));
	return url.substr(startPos);
    };

    var buildLink = function(text,url) {
	var link = $('<a>');
	link.attr('href',url);
	link.text(text);
	return link;
    }

    var getPost = function(filename) {
	if(ex.index == undefined) return null;
	
	//////////////////////////////////////////////////////////////////////
	// Asynchronously get the post text
	getJSON(filename,function(data) {
	    $('#text').html(data.text);
	});

	//////////////////////////////////////////////////////////////////////
	// Deal with all the attributes
	var post = ex.index.posts_by_filename[filename];
	document.title = ex.BLOG_TITLE + ' > ' + post.title;
	$('#title').text(post.title);
	var time = new Date(post.date * 1000); // seconds->milliseconds
	$('#date').text(time.toString());
	$('#blurb').html(post.blurb);
	var tags = $('#tags');
	tags.empty();
	for(var tag in post.tags) {
	    tags.append(post.tags[tag] + ' ');
	}
	
	//////////////////////////////////////////////////////////////////////
	// Build next link
	var next_filename = ex.index.next[filename];
	var next_div = $('#next_link');
	next_div.empty();
	if(next_filename != undefined) {
	    var next_post = ex.index.posts_by_filename[next_filename];
	    next_div.text('Next: ');
	    next_div.append(buildLink(next_post.title,DELIMITER + next_post.url));
	}

	//////////////////////////////////////////////////////////////////////
	// Build prev link
	var prev_filename = ex.index.prev[filename];
	var prev_div = $('#prev_link');
	prev_div.empty();
	if(prev_filename != undefined) {
	    var prev_post = ex.index.posts_by_filename[prev_filename];
	    prev_div.text('Previous: ');
	    prev_div.append(buildLink(prev_post.title,DELIMITER + prev_post.url));
	}
    }

    var getLatest = function() {
	var filename = ex.index.posts[0];
	var href = location.href;
	if(href.indexOf(DELIMITER) != -1) {
	    href = href.substring(0,href.indexOf(DELIMITER));
	}
	href += DELIMITER + ex.index.posts_by_filename[filename].url;
	location.href = href;
    }
    
    $(window).load(function() {
	getIndex(function(){
	    var url = parseLocation();
	    if(url == null || !(url in ex.index.posts_by_url)) {
		getLatest();
	    } else
		getPost(ex.index.posts_by_url[url]);
	});
    });
    return ex;
})();