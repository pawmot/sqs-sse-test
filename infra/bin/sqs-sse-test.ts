#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { SqsSseTestStack } from '../lib/sqs-sse-test-stack';

const app = new cdk.App();
new SqsSseTestStack(app, 'SqsSseTestStack');
