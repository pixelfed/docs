# S3 Compatible Storage 

You can configure your Pixelfed server to store the media in a S3 Compatible Storage (CDN).

[[toc]]

## Notes
> Never put dots in your bucket name. `pixelfedau` is correct. `pixelfed.au` is wrong. The dot will break the S3 providers TLS.

> Jortage does NOT work with Pixelfed as of writing this documentation.

## Compatible S3 Providers

* https://www.linode.com/products/object-storage/
* https://www.vultr.com/products/object-storage/
* https://www.exoscale.com/object-storage/
* https://www.ovhcloud.com/en-au/public-cloud/object-storage/
* https://wasabi.com/s3-compatible-cloud-storage/
* https://www.backblaze.com/b2/cloud-storage.html
* https://jortage.com/

## Provider Specific Configuration

### Linode Object Storage
Read the Linode documentation here: https://www.linode.com/docs/products/storage/object-storage/guides/urls/

![image](https://user-images.githubusercontent.com/17537000/172040619-e4df59e7-bc3e-4aaf-adb4-9e1595d76be4.png)

#### Example configuration for Linode
* Edit the .env
```
PF_ENABLE_CLOUD=true
AWS_ACCESS_KEY_ID=6UD7Yxxxxxxxxx1D5L
AWS_SECRET_ACCESS_KEY=bDK1XxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxsGOCh8
AWS_DEFAULT_REGION=US
AWS_BUCKET=<BucketName>
AWS_URL=https://<BucketName>.<ClusterID>.linodeobjects.com
AWS_ENDPOINT=https://<ClusterID>.linodeobjects.com
#AWS_USE_PATH_STYLE_ENDPOINT=false
```


### Vultr Object Storage
Read the Vultr documentation here: 

#### Example configuration for Vultr
* Edit the .env
```
PF_ENABLE_CLOUD=true
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=
AWS_BUCKET=<BucketName>
AWS_URL=
AWS_ENDPOINT=
#AWS_USE_PATH_STYLE_ENDPOINT=false
```


### Exoscale Object Storage
Read the Exoscale documentation here: 

#### Example configuration for Exoscale
* Edit the .env
```
PF_ENABLE_CLOUD=true
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=
AWS_BUCKET=<BucketName>
AWS_URL=
AWS_ENDPOINT=
#AWS_USE_PATH_STYLE_ENDPOINT=false
```


### OVH Object Storage
Read the OVH documentation here: 

#### Example configuration for OVH
* Edit the .env
```
PF_ENABLE_CLOUD=true
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=
AWS_BUCKET=<BucketName>
AWS_URL=
AWS_ENDPOINT=
#AWS_USE_PATH_STYLE_ENDPOINT=false
```

### Wasabi Cloud Storage
Read the Wasabi documentation here: 

#### Example configuration for Wasabi
* Edit the .env
```
PF_ENABLE_CLOUD=true
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=
AWS_BUCKET=<BucketName>
AWS_URL=
AWS_ENDPOINT=
#AWS_USE_PATH_STYLE_ENDPOINT=false
```

### Backblaze Cloud Storage
Read the Backblaze documentation here: 

#### Example configuration for Backblaze
* Edit the .env
```
PF_ENABLE_CLOUD=true
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=
AWS_BUCKET=<BucketName>
AWS_URL=
AWS_ENDPOINT=
#AWS_USE_PATH_STYLE_ENDPOINT=false
```

### Jortage Communal Cloud
> Does not work with Pixelfed
