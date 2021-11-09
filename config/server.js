module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  url: "https://api.example.com",
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET", "5c304435b6f8db0e0f198dd3a0a2340c"),
    },
  },
});
