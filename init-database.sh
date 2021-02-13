#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER docker;
    CREATE DATABASE matching_card_game;
    GRANT ALL PRIVILEGES ON DATABASE matching_card_game TO docker;
EOSQL