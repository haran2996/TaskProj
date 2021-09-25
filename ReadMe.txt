run npm i and npm run dev to start the server
make sure the mongo server is running
configure the mongo db url in libs/dbConnect.ts file
the edit and delete option for a story is only accessible for users of type admin
if there is no admin user in your db you can comment the line no 70 in components/NewsItem file
