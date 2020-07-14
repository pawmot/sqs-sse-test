import * as cdk from '@aws-cdk/core';
import * as kms from '@aws-cdk/aws-kms';
import * as sqs from '@aws-cdk/aws-sqs';
import * as lambda from '@aws-cdk/aws-lambda';
import {SqsEventSource} from '@aws-cdk/aws-lambda-event-sources';

export class SqsSseTestStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    let cmk = new kms.Key(this, "test-key", {
      alias: 'test-key',
      trustAccountIdentities: true
    });

    let dlq = new sqs.Queue(this, "dlq", {
      encryptionMasterKey: cmk
    });

    let queue = new sqs.Queue(this, "queue", {
      visibilityTimeout: cdk.Duration.seconds(30),
      retentionPeriod: cdk.Duration.days(1),
      receiveMessageWaitTime: cdk.Duration.seconds(20),
      deadLetterQueue: {
        queue: dlq,
        maxReceiveCount: 5
      },
      encryptionMasterKey: cmk
    });

    let queueFun = new lambda.Function(this, "sqsEvFun", {
      runtime: lambda.Runtime.GO_1_X,
      code: lambda.Code.fromAsset("../fun.zip"),
      handler: "main",
      tracing: lambda.Tracing.ACTIVE
    });
    queueFun.addEventSource(new SqsEventSource(queue));
  }
}
