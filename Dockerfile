FROM nginx:alpine

LABEL author="Dmitry Tochilin" 

# Copy custom nginx config
COPY ./nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html
COPY dist/my-app .

EXPOSE 80 443

ENTRYPOINT ["nginx", "-g", "daemon off;"]