#!/usr/bin/python
###########################################################################
#                                                                         #
# Copyright (c) 2011, Simon David Pratt <me@simondavidpratt.com>          #
#                                                                         #
# Permission to use, copy, modify, and/or distribute this software        #
# for any purpose with or without fee is hereby granted, provided         #
# that the above copyright notice and this permission notice appear       #
# in all copies.                                                          #
#                                                                         #
# THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL           #
# WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED           #
# WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE        #
# AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR                  #
# CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM          #
# LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT,         #
# NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN               #
# CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.                #
#                                                                         #
###########################################################################

###########################################################################
# imports
from sys import argv
import os.path
from common import read_until_eof
import json

###########################################################################
# check proper usage
if len(argv) < 3:
    print 'Usage:',argv[0],'{index_file} {post_file}'
    exit()

###########################################################################
# check post file exists
post_filename = argv[2]
if not os.path.exists(post_filename):
    print 'File not found: ',post_filename
    exit()

###########################################################################
# read in post
post = dict()
with open(post_filename,'rU') as file:
    post = json.loads(read_until_eof(file))

# remove text section
post.pop('text')

###########################################################################
# create or read in the index
index_filename = argv[1]
index = dict(posts_by_url={},posts_by_date={},posts_by_tag={})
if os.path.exists(index_filename):
    with open(index_filename,'rU') as file:
        index = json.loads(read_until_eof(file))

###########################################################################
# post url already exists
url = post['url']
if index['posts_by_url'].has_key(url):
    print 'url already exists in index: ',url
    exit()
        
###########################################################################
# add post to index
# by url
index['posts_by_url'][url] = post

# by date
date = post['date']
index['posts_by_date'][date] = url

# by tags
for tag in post['tags']:
    if index['posts_by_tag'].has_key(tag):
        index['posts_by_tag'][tag].append(url)
    else:
        index['posts_by_tag'][tag] = [url] # list = [item1,item2,...]

###########################################################################
# output index to file
with open(index_filename,'w') as file:
    file.write(json.dumps(index))
    file.write('\n')
