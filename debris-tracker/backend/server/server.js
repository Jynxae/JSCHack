const http = require("http"); //essetnials
const url = require("url");
const cors = require("cors");

const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Enable CORS using cors middleware
  cors()(req, res, () => {});
});

//example code below

//   // Enable CORS using cors middleware
//   cors()(req, res, () => {
//     const parsedUrl = url.parse(req.url, true); // Parse request URL
//     const pathname = parsedUrl.pathname;

//     switch (pathname) {
//       // Customer API endpoints
//       case "/user/validate-login":
//         userApi.validateUser(req, res);
//         break;
//       case "/user/register":
//         userApi.register(req, res);
//         break;
//       case "/user/update-user-details":
//         userApi.updateUserDetails(req, res);
//         break;

// default: //handle unknown routes
//         res.writeHead(404, { "Content-Type": "application/json" });
//         res.end(JSON.stringify({ error: "Route not found T^T" }));
//     }
//   });
// });

// const PORT = process.env.PORT || 8080;
// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
