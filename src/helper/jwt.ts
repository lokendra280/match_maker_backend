const jwt = require("jsonwebtoken");
import { Request, Response } from "express";
import { copyFileSync } from "fs";
import { roles } from "../ENUMS/RoleEnum";

export async function generateToken(user: any, expire?: any): Promise<any> {
  try {
    console.log(user);
    return await jwt.sign(
      {
        // email: user.email,
        id: user.id,
        roles: user.roleId.roles,
        email: user.email,
      },
      "json_web_token_pw",
      {
        expiresIn: "10h",
      }
    );
  } catch (err: any) {
    console.log(err);
  }
}

export function tokenValidation(req: Request, res: Response, next: any) {
  let authHeader = req.headers["authorization"];
  if (authHeader && authHeader.startsWith("Bearer ")) {
    // Remove "Bearer " from the authHeader
    authHeader = authHeader.slice(7, authHeader.length);
    console.log(authHeader);
  }
  console.log(authHeader);
  if (!authHeader) {
    return res.status(401).json({
      message: "No access_token found",
    });
  }
  jwt.verify(authHeader, "json_web_token_pw", (err: any, user: any) => {
    try {
      if (err)
        return res.status(401).json({
          message: "unauthorized access",
        });

      next();
    } catch (err) {
      res.send(err);
    }
  });
}

export function getCurrentUser(token: string): any {
  // function parseJwt (token) {
  return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());

  // }
}

export async function AdminAuthorization(
  req: Request,
  res: Response,
  next: any
): Promise<void> {
  let authHeader: any = req.headers["authorization"];
  if (authHeader && authHeader.startsWith("Bearer ")) {
    // Remove "Bearer " from the authHeader
    authHeader = authHeader.slice(7, authHeader.length);
    console.log(authHeader);
  }
  const user = JSON.parse(
    Buffer.from(authHeader.split(".")[1], "base64").toString()
  );
  for (let index = 0; index < user.roles.length; index++) {
    if (user.roles[index] === roles.ADMIN) {
      next();
      return;
    } else {
      res.status(401).json({
        message: "unauthorized access you are not admin!! sorry baby",
      });
      return;
    }
  }
}

export async function UsersAuthorization(
  req: Request,
  res: Response,
  next: any
): Promise<void> {
  let authHeader: any = req.headers["authorization"];
  if (authHeader && authHeader.startsWith("Bearer ")) {
    // Remove "Bearer " from the authHeader
    authHeader = authHeader.slice(7, authHeader.length);
    console.log(authHeader);
  }
  const user = JSON.parse(
    Buffer.from(authHeader.split(".")[1], "base64").toString()
  );
  for (let index = 0; index < user.roles.length; index++) {
    if (user.roles[index] === roles.USER) {
      next();
      return;
    } else {
      res.status(401).json({
        message: "unauthorized access you are not student!! sorry baby",
      });
      return;
    }
  }
}
