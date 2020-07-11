#!/bin/sh

command="concurrently"

while read package; do
    package="packages/${package//@renavigation\/}"
    command="$command \"(cd $package; yarn watch)\""
done <<< "$(lerna list)"

eval $command
