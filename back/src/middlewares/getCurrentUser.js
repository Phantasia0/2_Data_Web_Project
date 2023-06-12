import jwt from "jsonwebtoken";

function getCurrentUser(req, res, next) {
  // request 헤더로부터 authorization bearer 토큰을 받음.
  const userToken = req.headers["authorization"]?.split(" ")[1] ?? "null";

  // 해당 token 이 정상적인 token인지 확인 -> 토큰에 담긴 user_id 정보 추출
  try {
    if (userToken !== "null") {
      const secretKey = process.env.JWT_SECRET_KEY;
      const jwtDecoded = jwt.verify(userToken, secretKey);
      console.log(jwtDecoded);
      const _id = jwtDecoded._id;
      req.currentUserId = _id;
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(400).send("정상적인 토큰이 아닙니다. 다시 한 번 확인해 주세요.");
    return;
  }
}

export { getCurrentUser };
