import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as path from 'path'
import {
  aws_s3 as s3,
  aws_lambda as lambda
} from 'aws-cdk-lib'
import { NodejsFunction, NodejsFunctionProps } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Runtime } from 'aws-cdk-lib/aws-lambda';


export class CdkLayerStack extends cdk.Stack {

  public readonly layer: lambda.LayerVersion

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.layer = new lambda.LayerVersion(this, 'logic-layer', {
      compatibleRuntimes: [ 
        lambda.Runtime.NODEJS_14_X,
        lambda.Runtime.NODEJS_16_X, 
        lambda.Runtime.NODEJS_18_X
      ],
      layerVersionName: 'business-logic-layer',
      code: lambda.Code.fromAsset('src/layers/business-logic'),
      description: 'Business logic layer',
    })

    const nodeJsFnProps: NodejsFunctionProps = {
      bundling: {
        externalModules: [
          'aws-sdk', // Use the 'aws-sdk' available in the Lambda runtime
        ],
      },
      runtime: Runtime.NODEJS_16_X,
      timeout: cdk.Duration.minutes(3),
      memorySize: 256,
    };

    const lambdaWithLayer = new NodejsFunction(this, 'lambdaWithLayer', {
      entry: path.join(__dirname, '../src/lambdas', 'handler.ts'),
      ...nodeJsFnProps,
      functionName: 'lambdaWithLayer',
      handler: 'handler',
      layers: [this.layer],
    });
  }
}
