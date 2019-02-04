FROM nginx:alpine

# Install system requirements

COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html
RUN mkdir -p /openedx/edx-platform
COPY . /openedx/edx-platform
WORKDIR /openedx/edx-platform
COPY dist/ /usr/share/nginx/html
