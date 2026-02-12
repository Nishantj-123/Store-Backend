import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "secret123keynon"
    );

    req.user = decoded; // { id, email }
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default verifyToken;


// import jwt from "jsonwebtoken";

// // Middleware to protect routes
// const verifyToken = (req, res, next) => {
//   try {
// //     Looks for the Authorization header in the incoming request.
// // This is where your frontend sends the token:
// // headers: { Authorization: `Bearer ${token}` }
//     const authHeader = req.headers.authorization;

//   // If the token is missing or doesn't start with Bearer , the request is rejected with a 401 Unauthorized.
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
//     }

// // Header: "Bearer abc.def.ghi"
// // After split(" "): ["Bearer", "abc.def.ghi"]
// // We take the second part: abc.def.ghi
//     const token = authHeader.split(" ")[1];

//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret123keynon");

//     // Attach user ID to the request object
//     req.userId = decoded.id;

//     next(); // If token is valid, you let the request move forward to the controller/handler.
//   } catch (error) {
//     console.error("Token verification failed:", error.message);
//     res.status(401).json({ success: false, message: "Invalid or expired token" });
//   }
// };

// export default verifyToken;


// // Step	Action
// // 1️ Check for token	Looks for token in the request header
// // 2️ Verify it	Uses secret key to verify it's valid
// // 3️ Decode	Gets user info from token (like user ID)
// // 4️ Attach user ID	Stores it in req.userId
// // 5️ Continue	Calls next() to proceed
// // 6️ Catch errors	Returns error if anything fails