
import { RNS3 } from 'react-native-aws3';

const options = {
  keyPrefix: "images/",
  bucket: "images-for-lost-things",
  region: "us-east-1",
  accessKey: "AKIAJERLVEYLCM33YNHQ",
  secretKey: "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"
};

exports.uploadImage = async function(image) {
  image.name = image.name || image.fileName;
  const response = await RNS3.put(image, options);
  if(response.status !== 201) {
    console.error(response);
    throw new Error('Unable to upload');
  }
  return response;
};
