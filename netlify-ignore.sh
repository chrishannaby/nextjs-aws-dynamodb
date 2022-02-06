#!/bin/bash
if [[ $SITE_NAME == "nextjs-aws-dynamodb-previews" && $CONTEXT == "production" ]]
then
  exit 0
else
  exit 1
fi