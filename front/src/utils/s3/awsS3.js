import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  },
});

export async function uploadFileToS3(file, fileName, fileType){
  const fileBuffer = file;

  const params ={
    Bucket: process.env.AWS_S3_SECRET_BUCKET_NAME,
    Key: `${fileName}-${Date.now()}`,
    Body:fileBuffer,
    ContentType:fileType
  }

  const command = new PutObjectCommand(params);
  await s3Client.send(command);
  return params.Key
}