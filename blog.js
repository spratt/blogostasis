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
blog.getPost = function(filename,index) {
    //////////////////////////////////////////////////////////////////////
    // Asynchronously get the post text
    blog.getJSON(filename,function(data) {
	$('#text').html(data.text);
    });

    //////////////////////////////////////////////////////////////////////
    // Deal with all the attributes
    var post = index.posts_by_filename[filename];
    blog.setTitle(post.title);
    $('#title').text(post.title);
    $('#date').text(post.date);
    $('#author').text(post.author);
    $('#blurb').html(post.blurb);
    var tags = $('#tags');
    tags.empty();
    for(var tag in post.tags) {
	tags.append(post.tags[tag] + ' ');
    }
    
    //////////////////////////////////////////////////////////////////////
    // Build next link
    var next_filename = index.next[filename];
    var next_div = $('#next_link');
    next_div.empty();
    if(next_filename != undefined) {
	var next_post = index.posts_by_filename[next_filename];
	next_div.text('Next: ');
	next_div
	    .append(blog.buildLink(next_post.title,blog.DELIMITER + next_post.url));
    }

    //////////////////////////////////////////////////////////////////////
    // Build prev link
    var prev_filename = index.prev[filename];
    var prev_div = $('#prev_link');
    prev_div.empty();
    if(prev_filename != undefined) {
	var prev_post = index.posts_by_filename[prev_filename];
	prev_div.text('Previous: ');
	prev_div
	    .append(blog.buildLink(prev_post.title,blog.DELIMITER + prev_post.url));
    }
}

blog.getLatest = function(index) {
    var filename = index.posts[0];
    blog.getPost(filename,index);
}
blog.onload(function() {
    blog.getJSON('index.json',function(data){
	var url = blog.parseLocation();
	if(url == null || !(url in data.posts_by_url)) {
	    blog.getLatest(data);
	} else {
	    var filename = data.posts_by_url[url];
	    blog.getPost(filename,data);
	}
    });
});