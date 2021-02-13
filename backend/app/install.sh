#!/bin/bash
set -e

pip install pipenv
pipenv lock --keep-outdated --requirements > requirements.txt
pip install -r ./requirements.txt