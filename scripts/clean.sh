#!/bin/sh

while read package; do
    package="packages/${package//@renavigation\/}"
    rm -rf "$package/lib"
    rm -rf "$package/.jest"
    rm -rf "$package/coverage"
done <<< "$(lerna list)"

lerna clean -y

rm -rf node_modules
