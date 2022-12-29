FROM node:16-buster As development

WORKDIR /home/project/entity-generator   

RUN apt update;apt-get install -y vim 

RUN npm install -g @angular/cli@14

RUN git config --global user.email "dshusdock@gmail.com"

RUN git config --global user.name "dshusdock"

CMD ["bash"]
