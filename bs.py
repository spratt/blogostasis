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
import json

###########################################################################
# check proper usage
if len(argv) < 2:
    print 'Usage: bs.py {index_file}'
    exit()

###########################################################################
# check file exists
filename = argv[1]
# TODO
    
###########################################################################
# functions
def read_until_double_newline(file):
    str = ''
    line = file.readline()
    while line != '\n':  # any newline looks like \n
        str += line.strip()
        line = file.readline()
    return str

def read_until_eof(file):
    str = ''
    line = file.readline()
    while line != '':
        str += line.strip()
        line = file.readline()
    return str

###########################################################################
# data
post = dict()

###########################################################################
# main

# note mode 'wU', U allows universal newlines
with open(filename,'rU') as file:
    post['url'] = file.readline().strip()
    post['tags'] = file.readline().strip().split(' ')
    post['title'] = read_until_double_newline(file)
    post['blurb'] = read_until_double_newline(file)
    post['post'] = read_until_eof(file)

# dump json to a file
with open(filename+'.json','w') as file:
    file.write(json.dumps(post))
    file.write('\n')
