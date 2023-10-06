# Intro

<div align="center">
  <h1>
    <br/>
    <br/>
    <img src="../../img/sls-mentor.svg" style={{width: '60px'}} />
    <br />
    <img src="../../img/title.png" style={{width: '600px'}} alt="sls-mentor" />
    <br />
  </h1>
  <sup>
    <p>We are open to contributions, check our <a href="https://github.com/sls-mentor/sls-mentor/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22">good first issues</a>!</p>
    <a href="https://www.npmjs.com/package/sls-mentor">
       <img src="https://img.shields.io/npm/v/sls-mentor.svg" alt="npm package" />
    </a>
    <a href="https://www.npmjs.com/package/sls-mentor">
      <img src="https://img.shields.io/npm/dm/sls-mentor.svg" alt="npm downloads" />
    </a>
  </sup>
  <br />
  <br />
  <p>
    <q>Just because you don't see something, doesn't mean it doesn't exist</q>
  </p>
   <p align="right"> Anonymous on Tumblr - 2012 </p>
   <br/>
  <p>
    <a href="https://www.sls-mentor.dev"><b>sls-mentor</b></a> is a tool that analyzes the configuration of your AWS resources against best practice rules. <br /><a href="https://www.sls-mentor.dev"><b>sls-mentor</b></a> solves problems before they occur, and optimizes your app’s performances and costs.
  </p>
</div>
<br />
<br />
<div align="center">
  <h2>One minute quick start 🚀</h2>
  <br />
  <pre>npx <a href="https://www.npmjs.com/package/sls-mentor">sls-mentor</a></pre>
    <img src="../../img/guardian-run.gif" style={{width: '60%'}} />
  <br />
  <br />
</div>
<br />
<div align="center">
  <h2>Install sls-mentor on your project and customize your experience 🔎</h2>
  <br />
  <pre>yarn add -D <a href="https://www.npmjs.com/package/sls-mentor">sls-mentor</a></pre>

  <p>Select the cloudformation stacks you want to check using -c option</p>
  <pre>yarn sls-mentor -c YOUR_AWS_STACK_NAME_1 YOUR_AWS_STACK_NAME_2</pre>

  <p>Filter the checked resources by tags using the -t option</p>
  <pre>yarn sls-mentor -t Key=TAG_KEY,Value=TAG_VALUE</pre>

  <p>Specify an AWS profile or an AWS region using -p and -r options</p>
  <pre>yarn sls-mentor -p YOUR_AWS_PROFILE -c YOUR_AWS_STACK_NAME -r YOUR_AWS_REGION</pre>

  <p><a href="./set-up-sls-mentor/run-locally">📚 More information about local runs of sls-mentor</a></p>
  <br />
</div>
<br />
<div align="center">
  <h2>Run sls-mentor as a periodic check on your CI 📟</h2>
  <br />
  <p>The command you want to run in your pipeline is:</p>
  <pre>yarn sls-mentor -p YOUR_AWS_PROFILE -c YOUR_AWS_STACK_NAME -r YOUR_AWS_REGION -l YOUR_DESIRED_LEVEL</pre>

  <p><i>Github actions, Circle CI, Gitlab CI configuration snippets coming soon 🚀</i></p>
  <br/>
  <p>⚠️ To make sure it properly works when executed by a pipeline runner:<br/>

<li>Ensure that the CI/CD runner has an AWS profile configured, with ReadOnlyAccess privileges</li>
<li>If the region is not configured for that profile, make sure to specify it using the -r flag in the command</li></p>
  <p><a href="./set-up-sls-mentor/run-in-ci">📚 More information about CI runs of sls-mentor</a></p>
</div>
<br />
<br />
<h2 align="center">Rules featured by sls-mentor 📏</h2>
<br />

<a name="Lambda">AWS Lambda:</a>

- [`Lambda: Use ARM64 architecture`](./rules/useArm): checks that you're using ARM64 architectures for your Lambda functions.
- [`Lambda: No shared IAM roles`](./rules/noSharedIamRoles): checks that each one of your Lambda functions has its own IAM role.
- [`Lambda: Limited amount of versions`](./rules/limitedAmountOfVersions): checks that you do not store all previous deployment versions for your Lambda functions.
- [`Lambda: Specify failure destination to async functions`](./rules/asyncSpecifyFailureDestination): checks that each one of your async Lambda functions has a failure destination.
- [`Lambda: No mono package`](./rules/noMonoPackage): checks that each one of your Lambda functions has different code.
- [`Lambda: Light bundle`](./rules/lightBundle): checks that each one of your Lambda functions' bundles is reasonably small.
- [`Lambda: Under maximum memory`](./rules/underMaxMemory): checks that each one of your Lambda functions' memory size is reasonably small.
- [`Lambda: No maximum timeout`](./rules/noMaxTimeout): checks that your Lambda functions' timeout is not set at the maximum available.
- [`Lambda: No provisioned concurrency`](./rules/noProvisionedConcurrency): checks that no Lambda function has provisioned concurrency.
- [`Lambda: No deprecated runtime`](./rules/noDeprecatedRuntime): checks that your Lambda functions do not run on deprecated runtime.

<a name="S3">AWS S3:</a>

- [`S3: Use intelligent tiering`](./rules/useIntelligentTiering): checks that each one of S3 buckets has intelligent tiering enabled.
- [`S3: Use HTTPS requests only`](./rules/s3OnlyAllowHTTPS): checks that users access buckets objects using SSL.

<a name="SQS">AWS SQS:</a>

- [`SQS: Specify a DLQ on queues`](./rules/specifyDlqOnSqs): checks that SQS queues have a dead-letter-queue specified in case of failure

<a name="Cognito">AWS Cognito:</a>

- [`Cognito: Sign-in case insensitivity`](./rules/cognitoSignInCaseInsensitivity): checks that your Cognito user pool is insensitive to user name case.

<a name="Cloudwatch">AWS CloudWatch:</a>

- [`CloudWatch Log Groups: Defined logs retention duration`](./rules/definedLogsRetentionDuration): checks that each of your Log Groups has a defined log retention duration.

<a name="EventBridge">AWS EventBridge:</a>

- [`EventBridge: Specified dead letter queue`](./rules/specifyDlqOnEventBridgeRule): checks that each Event Bridge Rule target has a dead letter queue.

<a name="CloudFront">AWS CloudFront:</a>

- [`CloudFront: Enable security headers`](./rules/cloudFrontSecurityHeaders): checks that each CloudFront distributions have basic security headers enabled.
- [`CloudFront: Use a SSL certificate`](./rules/cloudFrontSSLCertificate): checks that CloudFront distributions use custom SSL certificates from ACM or IAM.

<a name="RDS">AWS RDS:</a>

- [`RDS: Enable instance autoscaling`](./rules/autoscaleRdsInstanceEnabled): checks that RDS instances have autoscaling enabled.

<a name="Backup">AWS Backup:</a>

- [`Backup: Define backup retention period`](./rules/definedBackupRetentionPeriodOrTransitionToColdStorage): checks that backups have a retention period or are transitioned to clod storage

<a name="ApiGatewayV2">AWS Api Gateway V2:</a>

- [`Api Gateway V2: no unauthorized route`](./rules/noUnauthorizedApiGatewaysV2Routes.md): checks that all your backend routes have authorization enabled

<br/>
<p>Check out our articles, to find out more:</p>

- <a href='https://dev.to/slsbytheodo/guardian-100-available-now-your-free-open-source-audit-tool-for-aws-architectures-54cd'><b>sls-mentor 1.0.0 available now! Your Free Open Source audit tool for AWS architectures!</b></a> by <a href='https://twitter.com/eloiatheodo'>Éloi</a>
- <a href='https://dev.to/slsbytheodo/that-one-aws-lambda-hidden-configuration-that-will-make-you-a-hero-guardian-is-watching-over-you-5gi7'><b>That one AWS Lambda hidden configuration that will make you a Hero - sls-mentor is watching over you</b></a> by <a href='https://twitter.com/Gozinebgo'>Zineb</a>
- <a href='https://dev.to/slsbytheodo/aws-lambda-versions-time-to-clean-up-guardian-is-watching-over-you-jkd'><b>AWS Lambda Versions : Time to clean up! - sls-mentor is watching over you</b></a> by <a href='https://twitter.com/PierreChollet22'>Pierre</a>
- <a href='https://dev.to/slsbytheodo/aws-lambda-101-shave-that-bundle-down-48c7'><b>AWS Lambda 101: Shave That Bundle Down</b></a> by <a href='https://twitter.com/eloiatheodo'>Éloi</a>

<br />
<br />
<div align="center">
  <h2>About sls-mentor 📰</h2>
  <br />
  <p>
  sls-mentor is a <a href='https://www.theodo.fr/startup-studio-m33'>Theodo Group</a> project made for AWS Serverless developers by AWS Serverless developers. Original idea appeared at <a href='https://www.aleios.com/'>Aleios</a>. sls-mentor was migrated to Typescript and enriched by <a href='https://www.theodo.fr/experts-serverless-theodo-paris'>Theodo</a>.
  </p>
</div>
<br />
<br />
<div align="center">
  <h2>Contributors ❤️</h2>
  <br />
  <a href="https://github.com/sls-mentor/sls-mentor/graphs/contributors">
    <img src="https://contrib.rocks/image?repo=sls-mentor/sls-mentor" />
  </a>
  <a href="https://github.com/aleios-cloud/sls-dev-tools/graphs/contributors">
    <img src="https://contrib.rocks/image?repo=aleios-cloud/sls-dev-tools" />
  </a>
  <br/>
  <br/>
  <h4>Your contributions are very welcome, feel free to add new rules to sls-mentor !</h4>
  <br />
  <br />
</div>
