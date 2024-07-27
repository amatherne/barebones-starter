#!/bin/bash
echo "{Running command :: node --trace-deprecation $@}"
node --trace-deprecation "$@"