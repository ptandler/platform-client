# How to get the client up and running?

My personal notes how I got things working :-)


## git clone and checkout

   git clone https://github.com/ptandler/platform-client.git
   git checkout staging

## Configuration

config is defined in `app/config.js.j2` and processed during docker build by jinja (see `nginx.run.sh`)
The resulting `config.js` is included by `root/index.ejs` and defines `window.ushahidi` as global config variable.

Most config stuff is then also defined as angular constants in `legacy/app/app.js`.


## Build & run Docker Image

```bash
date=$(date +%Y-%m-%d--%H-%M)
source .env # sets DOCKER_ID
name=${DOCKER_ID}.$date
tag=${DOCKER_ID}:$date
docker build -t $tag .
docker run  --env BACKEND_URL=$BACKEND_URL -p 8888:8080 --name $name --restart=always --detach $tag
```

## Build & run Docker Image **with custom SDK & Design**

NOTE: The default Dockerfile fails when custom packages e.g. for SDK and platform-library / design
      are used that are not published to npm. Use the local build instead.

1. build app locally: `npm run install:all` (to be safe ...) & `npm run build:docker`
2. tag & push docker image to docker registry (e.g. the one running on peta.iku.gmbh)
3. pull & run image on server

### Ensure the docker registry is running on registry server

```bash
cd ~/docker-registry
docker-compose up -d
```

### Build & Publish Image locally

```bash
date=$(date +%Y-%m-%d--%H-%M)
# config should be in `.env`
source .env
name=${DOCKER_ID}.$date
tag=${DOCKER_ID}:$date
latest=${DOCKER_ID}:latest
staging=${DOCKER_ID}:staging
repo=$DOCKER_REGISTRY_SERVER

# it seems that a previous build is not always correctly replaced ... make sure to remove it!
rm -rf ./build/*

npm run install:all
npm run build
docker build -f use-build.Dockerfile -t $tag .
docker images ${DOCKER_ID}
docker images $tag

# test
# docker run  --env BACKEND_URL=http://192.168.33.110/ -p 8888:8080 --name $name --restart=always --detach $tag
# docker run  --env BACKEND_URL=$BACKEND_URL -p 8888:8080 --name $name --restart=always --detach $tag
docker run  --env BACKEND_URL=$BACKEND_URL -p 8888:8080 --name $name $tag

# publish & update "latest" locally and in repo
docker tag $tag $repo/$tag
# for staging:
docker tag $tag $staging
docker tag $tag $repo/$staging
# for release:
docker tag $tag $latest
docker tag $tag $repo/$latest

docker images $DOCKER_ID
docker images $repo/$DOCKER_ID

echo "$DOCKER_REGISTRY_PASSWORD" | docker login -u $DOCKER_REGISTRY_USER --password-stdin $repo
# push all images:
# docker push $repo/${DOCKER_ID} -a
docker push $repo/$tag
docker push $repo/$staging
docker push $repo/$latest
```
You might want to check the images in the registry - https://stackoverflow.com/a/31750543/1480587
- https://$repo/v2/_catalog
- https://$repo/v2/ushahidi-client-iku/tags/list
- https://$repo/v2/platform_platform/tags/list
- https://$repo/v2/platform_platform_tasks/tags/list


### Pull & Run Image on server

```bash
source .env
# copy date from above!
date=yyyy-mm-dd--hh-mm
# config should be in `.env`
source .env
name=${DOCKER_ID}.$date
tag=${DOCKER_ID}:$date
latest=${DOCKER_ID}:latest
staging=${DOCKER_ID}:staging
repo=$DOCKER_REGISTRY_SERVER

echo "$DOCKER_REGISTRY_PASSWORD" | docker login -u $DOCKER_REGISTRY_USER --password-stdin $repo

# pull only new images
docker pull $repo/$tag
docker pull $repo/$staging
docker pull $repo/$latest

# or pull images with all tags
docker pull $repo/$DOCKER_ID -a
docker images

# run
docker run  --env BACKEND_URL=$BACKEND_URL -p 8881:8080 --name $name --restart=always --detach $repo/$tag
```
