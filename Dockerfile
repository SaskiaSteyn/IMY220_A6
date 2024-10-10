#Saskia Steyn u17267162

FROM node:20

WORKDIR /u17267162

COPY . . 

RUN npm install

CMD ["npm", "start"]

EXPOSE 3000