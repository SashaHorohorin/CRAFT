#!/usr/bin/env bash

mvn clean package

echo 'Copy files...'

scp -i ~/.ssh/id_rsa \
    target/craft-0.0.1-SNAPSHOT.jar \
    Dockerfile \
    docker-compose.yml \
    root@77.222.53.22:/root/

echo 'Restart server...'

ssh -i ~/.ssh/id_rsa root@77.222.53.22 << EOF
    docker compose down
    docker compose build --pull --no-cache
    docker compose up -d
EOF

$SHELL
