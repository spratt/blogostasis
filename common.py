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

def remove_newlines(string):
    return string.strip('\n')

def read_until_double_newline(file):
    str = ''
    line = file.readline()
    while line != '\n':  # any newline looks like \n
        str += line
        line = file.readline()
    return str

def read_until_eof(file):
    str = ''
    line = file.readline()
    while line != '':
        str += line
        line = file.readline()
    return str
