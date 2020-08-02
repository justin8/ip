#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { IpStack } from "../lib/ip-stack";

const env = { account: "650127245949", region: "us-east-1" };

const app = new cdk.App();
new IpStack(app, "IpStack", { env });
