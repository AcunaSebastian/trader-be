import JWT from "jsonwebtoken";

type jwtPayload = { email: string };
interface JWTAdapter {
  sign(payload: jwtPayload): string;
  verify(token: string): jwtPayload;
}

export class JWTAdapterImpl implements JWTAdapter {
  private readonly secret: string;

  constructor() {
    this.secret = process.env.JWT_SECRET || "sh1tk3y";
  }

  sign(payload: { email: string }): string {
    return JWT.sign(payload, this.secret, { expiresIn: "15h" });
  }
  verify(token: string) {
    const payload = JWT.verify(token, this.secret);

    if (typeof payload === "string") {
      throw new Error("Invalid token");
    }
    return payload as jwtPayload;
  }
}
