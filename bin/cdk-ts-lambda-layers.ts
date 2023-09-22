#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkTsLambdaLayersStack } from '../lib/cdk-ts-lambda-layers-stack';
import { CdkS3BucketStack } from '../lib/cdk-s3-bucket-stack'

const app = new cdk.App();
// new CdkTsLambdaLayersStack(app, 'CdkTsLambdaLayersStack', {});
new CdkS3BucketStack(app, 'CdkS3BucketStack', {});