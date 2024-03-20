# TLDR

How to deploy this to 'production' as of 2-10-2024

# STEPS

1. Pushing code to the `main` branch triggers the build pipeline
1. Build processes can be viewed here: https://github.com/cpuedohacerlo/mvp/actions
    - Can be viewed here: https://github.com/cpuedohacerlo/mvp/actions
1. Confirm build artifact in `packages` page of the GitHub repo if needed
    - https://github.com/cpuedohacerlo/mvp/pkgs/container/mvp/177358670?tag=main
1. ssh tad@ava.drop-bot.com
1. then deploy the code ie:
```
cd /home/tad/trial
docker compose pull
docker compose up -d OR docker compose up -d --build 
docker compose logs -f
docker compose logs drop-bot-webapp  -f
```

## COMMON ISSUES

### Authenticating to ghcr.io

- You will need to be logged into ghcr.io to be authorized to pull images

1. Go to https://github.com/settings/tokens/new
1. Create a token with the `read:packages` permission.
1. run "docker login ghcr.io -u YOUR_GITHUB_USERNAME"
1. and use the token as the password on a one-time (or minimal basis)