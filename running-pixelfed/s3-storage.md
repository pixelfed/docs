# S3 Compatible Storage 

You can configure your Pixelfed server to store the media in a S3 Compatible Storage (CDN).

[[toc]]

## Notes
> `FILESYSTEM_DRIVER` should ALWAYS be `local`

> Never put dots in your bucket name. `pixelfedau` is correct. `pixelfed.au` is wrong. The dot will break the S3 providers TLS.

> Jortage does NOT work with Pixelfed as of writing this documentation.

## S3 Compatible Providers (Untested)
* [Amazon Simple Storage Service (S3)](https://aws.amazon.com/s3/)
* [Digital Ocean Spaces](https://www.digitalocean.com/products/spaces)
* [Linode Object Storage](https://www.linode.com/products/object-storage/)
* [Vultr Object Storage](https://www.vultr.com/products/object-storage/)
* [Exoscale Simple Object Storage (SOS)](https://www.exoscale.com/object-storage/)
* [OVH Object Storage](https://www.ovhcloud.com/en-au/public-cloud/object-storage/)
* [Wasabi Cloud Storage](https://wasabi.com/s3-compatible-cloud-storage/)
* [Backblaze Cloud Storage](https://www.backblaze.com/b2/cloud-storage.html)
* [Jortage Communal Cloud](https://jortage.com/)

## Provider Specific Configuration
----

### Amazon Simple Storage Service (S3)
Read the Linode documentation here: https://docs.aws.amazon.com/s3/index.html

* STATUS: Untested

#### Example configuration for AWS S3
* Edit the .env
```
PF_ENABLE_CLOUD=true
FILESYSTEM_DRIVER=local
FILESYSTEM_CLOUD=s3
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=
AWS_BUCKET=<BucketName>
AWS_URL=
AWS_ENDPOINT=
#AWS_USE_PATH_STYLE_ENDPOINT=false
```

----

### Digital Ocean Spaces
Read the Spaces documentation here: https://docs.digitalocean.com/products/spaces/

* STATUS: Untested

#### Example configuration for Spaces
* Edit the .env
```
PF_ENABLE_CLOUD=true
FILESYSTEM_DRIVER=local
FILESYSTEM_CLOUD=s3
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=US
AWS_BUCKET=<BucketName>
AWS_URL=
AWS_ENDPOINT=
#AWS_USE_PATH_STYLE_ENDPOINT=false
```

----

### Linode Object Storage
Read the Linode documentation here: https://www.linode.com/docs/products/storage/object-storage/guides/urls/

* STATUS: Tested

![image](https://user-images.githubusercontent.com/17537000/172040619-e4df59e7-bc3e-4aaf-adb4-9e1595d76be4.png)

### Creating a Linode Bucket
* Set the default Access Control List (ACL) to public read.
![image](https://user-images.githubusercontent.com/17537000/172041581-6e3b80bd-7c7b-4d39-87fa-208f8d5505a4.png)


#### Example configuration for Linode
* Edit the .env
```
PF_ENABLE_CLOUD=true
FILESYSTEM_DRIVER=local
FILESYSTEM_CLOUD=s3
AWS_ACCESS_KEY_ID=6UD7Yxxxxxxxxx1D5L
AWS_SECRET_ACCESS_KEY=bDK1XxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxsGOCh8
AWS_DEFAULT_REGION=US
AWS_BUCKET=<BucketName>
AWS_URL=https://<BucketName>.<ClusterID>.linodeobjects.com
AWS_ENDPOINT=https://<ClusterID>.linodeobjects.com
#AWS_USE_PATH_STYLE_ENDPOINT=false
```

----

### Vultr Object Storage
Read the Vultr documentation here: https://www.vultr.com/docs/vultr-object-storage/

* STATUS: Untested

#### Example configuration for Vultr
* Edit the .env
```
PF_ENABLE_CLOUD=true
FILESYSTEM_DRIVER=local
FILESYSTEM_CLOUD=s3
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=
AWS_BUCKET=<BucketName>
AWS_URL=
AWS_ENDPOINT=
#AWS_USE_PATH_STYLE_ENDPOINT=false
```

----

### Exoscale Simple Object Storage (SOS)
Read the Exoscale documentation here: https://community.exoscale.com/documentation/storage/

* STATUS: Untested

#### Example configuration for Exoscale
* Edit the .env
```
PF_ENABLE_CLOUD=true
FILESYSTEM_DRIVER=local
FILESYSTEM_CLOUD=s3
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=
AWS_BUCKET=<BucketName>
AWS_URL=
AWS_ENDPOINT=
#AWS_USE_PATH_STYLE_ENDPOINT=false
```

----

### OVH Object Storage
Read the OVH documentation here: https://docs.ovh.com/au/en/storage/s3/getting-started-with-s3/

* STATUS: Untested

#### Example configuration for OVH
* Edit the .env
```
PF_ENABLE_CLOUD=true
FILESYSTEM_DRIVER=local
FILESYSTEM_CLOUD=s3
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=
AWS_BUCKET=<BucketName>
AWS_URL=
AWS_ENDPOINT=https://s3.<public cloud region>.cloud.ovh.net
#AWS_USE_PATH_STYLE_ENDPOINT=false
```

----

### Wasabi Cloud Storage
Read the Wasabi documentation here: https://wasabi.com/help/

* STATUS: Untested

#### Example configuration for Wasabi
* Edit the .env
```
PF_ENABLE_CLOUD=true
FILESYSTEM_DRIVER=local
FILESYSTEM_CLOUD=s3
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=
AWS_BUCKET=<BucketName>
AWS_URL=
AWS_ENDPOINT=
#AWS_USE_PATH_STYLE_ENDPOINT=false
```

----

### Backblaze Cloud Storage
Read the Backblaze documentation here: https://www.backblaze.com/b2/docs/

* STATUS: Untested

#### Example configuration for Backblaze
* Edit the .env
```
PF_ENABLE_CLOUD=true
FILESYSTEM_DRIVER=local
FILESYSTEM_CLOUD=s3
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=
AWS_BUCKET=<BucketName>
AWS_URL=
AWS_ENDPOINT=
#AWS_USE_PATH_STYLE_ENDPOINT=false
```

----

### Jortage Communal Cloud
> Does not work with Pixelfed
