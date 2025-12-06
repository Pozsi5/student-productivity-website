FROM ubuntu:latest
LABEL authors="balazs.pozsonyi"

ENTRYPOINT ["top", "-b"]