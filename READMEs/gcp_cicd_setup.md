# TLDR

Following rushi patel's technique

## Reference links

- https://dev.to/rushi-patel/deploy-next-js-app-to-google-cloud-run-with-github-actions-cicd-a-complete-guide-l29

## STEP - Create a service account in GCP

- https://console.cloud.google.com/iam-admin/serviceaccounts?referrer=search&project=ceremonial-bond-416622

## TESTING CICD with GitHub Actions

### 1st snag

denied: Artifact Registry API has not been used in project 923138966436 before or it is disabled. Enable it by visiting https://console.developers.google.com/apis/api/artifactregistry.googleapis.com/overview?project=923138966436 then retry. If you enabled this API recently, wait a few minutes for the action to propagate to our systems and retry.

So had to enable Artifact Registry API

https://console.cloud.google.com/apis/library/artifactregistry.googleapis.com?project=ceremonial-bond-416622

### 2nd snag

RROR: (gcloud.run.deploy) PERMISSION_DENIED: Cloud Run Admin API has not been used in project *** before or it is disabled. Enable it by visiting https://console.developers.google.com/apis/api/run.googleapis.com/overview?project=*** then retry. If you enabled this API recently, wait a few minutes for the action to propagate to our systems and retry.

## HACK for trigger CICD