FROM python:3.7-alpine

ENV PYTHONUNBUFFERED 1

COPY /requirements.txt /requirements.txt

# Run the following separately to take advantage
# of layer caching.

RUN apk update && apk add \
    postgresql-dev \
    gcc \
    python3-dev \
    musl-dev
RUN pip install --upgrade pip
RUN pip install -r /requirements.txt

RUN mkdir /app
WORKDIR /app
COPY ./app /app

RUN adduser -D cody
USER cody
