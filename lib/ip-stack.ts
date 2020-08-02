import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as apigateway from "@aws-cdk/aws-apigateway";
import * as route53 from "@aws-cdk/aws-route53";
import * as targets from "@aws-cdk/aws-route53-targets";
import { Certificate } from "@aws-cdk/aws-certificatemanager";
import { execSync } from "child_process";
import { existsSync, mkdirSync } from "fs";
import { PythonFunction } from "@justin8-cdk/python-lambda";

const domainName = "ip.dray.id.au";
const certificateArn =
  "arn:aws:acm:us-east-1:650127245949:certificate/5aec232a-bcec-4d57-a6c2-388ed68938b7";

export class IpStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambdaFunction = new PythonFunction(this, "ip", {
      handler: "index.lambda_handler",
      runtime: lambda.Runtime.PYTHON_3_8,
    });

    const certificate = Certificate.fromCertificateArn(
      this,
      "cert",
      certificateArn
    );

    const gateway = new apigateway.LambdaRestApi(this, "gateway", {
      handler: lambdaFunction,
      domainName: { domainName, certificate },
    });

    const zone = new route53.HostedZone(this, "zone", { zoneName: domainName });

    new route53.ARecord(this, "record", {
      zone,
      target: route53.RecordTarget.fromAlias(new targets.ApiGateway(gateway)),
      recordName: domainName,
    });
  }
}
