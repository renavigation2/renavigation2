#!/bin/sh

if [ $CI ]; then
  exit 0
else
  (cd ios; pod install)
fi
