docker build -t nest-prisma-server .
docker run -d -t -p 5000:5000 nest-prisma-server