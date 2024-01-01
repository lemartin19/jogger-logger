import { SecretManagerServiceClient } from '@google-cloud/secret-manager';

const name = `projects/jogger-logger/secrets/jogger-logger-strava-api-client-secret/versions/1`;

const client = new SecretManagerServiceClient();

export async function accessStravaApiSecret() {
  const [version] = await client.accessSecretVersion({
    name: name,
  });

  const payload = version.payload!.data!.toString();
  return payload;
}
