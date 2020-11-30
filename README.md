# node-directory-sync-example

An example application demonstrating how Directory Sync works with WorkOS and Node.

## Clone and Install

Clone this repo and install dependencies:

```sh
git clone https://github.com/workos-inc/node-directory-sync-example.git && cd node-directory-sync-example && npm install
```

## Configure your environment

1. Grab your [API Key](https://dashboard.workos.com/api-keys).
2. Get your [Project ID](https://dashboard.workos.com/sso/configuration).
3. Create a `.env` file at the root of the project and populate with the
following environment variables (using values found above):

```typescript
WORKOS_API_KEY=your_api_key_here
WORKOS_PROJECT_ID=your_project_id_here
```

## Run the server and log in using SSO

```sh
npm start
```

Head to `http://localhost:8000/` to navigate your directories!

For more information, see the [WorkOS Node SDK documentation](https://docs.workos.com/sdk/node).
