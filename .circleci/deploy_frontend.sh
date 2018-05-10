AWS_DEFAULT_REGION=eu-west-1 \
AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID \
AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY \

aws s3 sync frontend/build/ s3://cyf-dos --delete --acl public-read

# invalidate cache in cloudfront
aws configure set preview.cloudfront true
aws cloudfront create-invalidation \
    --distribution-id E1YRVRN38DJTEK \
    --paths "/*"