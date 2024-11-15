import ngrok from "@ngrok/ngrok";
import dotenv from "dotenv";

dotenv.config();

export default function ngrokIntegration({ authtoken, port }) {
  return {
    name: "ngrok-integration",
    hooks: {
      "astro:server:start": async () => {
        let ngrokListener;
        try {
          const ngrokEnvToken = process.env.NGROK_AUTHTOKEN;
          // Authenticate ngrok with authtoken if provided
          if (!!ngrokEnvToken) {
            ngrokListener = await ngrok.forward({
              authtoken: ngrokEnvToken,
              addr: port,
            });
          } else {
            ngrokListener = await ngrok.forward({
              addr: port,
              authtoken_from_env: true,
            });
          }

          // Start ngrok with the specified port
          const url = await ngrokListener.url();
          console.log("NGROK Base URL", url);
          console.log(`Webflow Redirect URI: ${url}/api/auth`);
        } catch (err) {
          console.error("Failed to start ngrok tunnel:", err);
        }

        const disconnectNgrok = async () => {
          try {
            await ngrokListener.close();
            // await ngrok.disconnect(ngrokListener.url());
            console.log("ngrok tunnel disconnected");
            process.exit(0);
          } catch (err) {
            console.error("Failed to disconnect ngrok tunnel:", err);
            process.exit(1);
          }
        };

        process.on("SIGTERM", async () => {
          await disconnectNgrok();
        });
        process.on("SIGINT", async () => {
          await disconnectNgrok();
          process.exit(0);
        });
      },
    },
  };
}
