FROM node:22-alpine
WORKDIR /app
# package.json და package-lock.json კოპირება და dependencies-ის ინსტალაცია
COPY package*.json ./
RUN npm install --only=production
# კოდის კოპირება
COPY . .
EXPOSE 5000
CMD ["node", "server.js"]