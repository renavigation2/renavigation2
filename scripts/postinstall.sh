#!/bin/sh

lerna run postinstall

if [ $GITHUB_ACTIONS ]; then
  exit 0
else
  lerna run pod-install
fi
