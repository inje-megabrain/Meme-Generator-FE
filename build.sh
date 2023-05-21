
if [[ -z "$1" ]]; then
    echo "진서야 버전 넣어라.,"
    exit 1
fi

#!/bin/bash
docker buildx build \
    --platform linux/amd64,linux/arm64/v8 \
    -t choijinseo/memegenerator:$1 \
    --push .

# bash ./build.sh 새로운_버전
# bash ./build.sh 2.0