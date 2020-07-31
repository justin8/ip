#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { IpStack } from '../lib/ip-stack';

const app = new cdk.App();
new IpStack(app, 'IpStack');
