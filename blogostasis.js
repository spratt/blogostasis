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
var blog_configuration =
    {title:'My Bodacious Blog',
     url:'http://localhost/'};
var blog = (function (ob) {
    var ex = {}; // to be returned

    //////////////////////////////////////////////////////////////////////
    // Constants
    ex.DELIMITER  = '?'; // modify at own risk
    ex.BLOG_TITLE = ob.title;
    ex.URL = ob.url;

    //////////////////////////////////////////////////////////////////////
    // Functions
    var getJSON = function(url,success_fn) {
	$.getJSON(url,{},function(data) { // requires jquery
	    success_fn(data);
	});
    };
    ex.getJSON = getJSON;

    var setTitle = function(title) {
	document.title = ex.BLOG_TITLE;
	if(title != undefined)
	    document.title += ' > ' + title;
    }
    ex.setTitle = setTitle;

    var removeHash = function(str) {
	var pos = str.indexOf('#');
	if(pos == -1) return str;
	return str.substr(0,pos);
    }
    ex.removeHash = removeHash;

    var parseLocation = function() {
	var url = removeHash(location.href);
	var startPos = 1 + url.lastIndexOf(ex.DELIMITER);
	if(startPos == -1) {
	    return null;
	}
	return url.substr(startPos);
    };
    ex.parseLocation = parseLocation;

    var buildLink = function(text,url) {
	var link = $('<a>');
	link.attr('href',url);
	link.text(text);
	return link;
    }
    ex.buildLink = buildLink;

    var onload = function(fn) {
	$(window).load(fn); // requires jquery
    }
    ex.onload = onload;
    
    return ex;
})(blog_configuration);