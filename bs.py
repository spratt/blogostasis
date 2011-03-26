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
import time
from sys import argv
import os.path
from common import read_until_double_newline, read_until_eof
import json

###########################################################################
# check proper usage
if len(argv) < 2:
    command = argv[0].rsplit('/')[-1]
    print 'Usage:', command, 'input_file [output_file]'
    exit()

###########################################################################
# determine i/o files
in_file = argv[1]
out_file = in_file + '.json'
if len(argv) > 2:
    out_file = argv[2]

###########################################################################
# check input file exists
if not os.path.exists(in_file):
    print 'File not found: ',in_file
    exit()

###########################################################################
# read in bsf
post = dict(date=int(time.time()))

# note mode 'wU', U allows universal newlines
with open(in_file,'rU') as file:
    post['url'] = file.readline().strip()
    post['tags'] = file.readline().strip().split(' ')
    post['title'] = read_until_double_newline(file)
    post['blurb'] = read_until_double_newline(file)
    post['text'] = read_until_eof(file)

###########################################################################
# dump json to a file
with open(out_file,'w') as file:
    file.write(json.dumps(post))
    file.write('\n')
