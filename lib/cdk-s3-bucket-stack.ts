import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {
  aws_s3 as s3
} from 'aws-cdk-lib'


export class CdkS3BucketStack extends cdk.Stack {

  public readonly bucket: s3.Bucket

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.bucket = new s3.Bucket(this, 'test-s3-bucket-230922', {
      versioned: false,
      bucketName: '230922-test-s3-bucket-name',
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    })
  }
}
