#!/bin/bash
set -e

if [ $TEMPLATE_REPO ]; then
    echo >&2 "Installing templates from $TEMPLATE_REPO in $TEMPLATE_DIR"
    git clone $TEMPLATE_REPO $TEMPLATE_DIR
fi


exec "$@"
