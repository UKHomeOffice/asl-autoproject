FROM ubuntu:18.04


ENV DEBIAN_FRONTEND=noninteractive LANG=en_US.UTF-8 LC_ALL=C.UTF-8 LANGUAGE=en_US.UTF-8

RUN apt-get update && \
    apt-get install -y apt-utils && \
    apt-get upgrade -y && \
    apt-get install -y libxml-libxml-perl && \
    apt-get install -y libexpat1-dev && \
    apt-get -fy install && \
    apt-get install -y make && \
    apt-get install -y cpanminus

RUN cpanm Selenium::Remote::Driver@1.20
RUN cpanm Selenium::Chrome@1.20
RUN cpan Selenium::Remote::WDKeys@1.20
# install modules that are needed
RUN ["cpanm", "Test::Assert", "File::Slurp", "Path::Tiny"]
WORKDIR /script
COPY ./*.pl /script/
COPY ./*.pm /script/
COPY ./*.txt /script/
COPY ./run* /script/

ENTRYPOINT bash ./run_ppl dev "$TPW"


