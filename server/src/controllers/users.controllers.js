import { User } from "../models/users.models";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const AccessToken = await user.generateAccessToken();
    const RefreshToken = await user.generateRefreshToken();

    return { AccessToken, RefreshToken };
  } catch (error) {
    console.log(error);
    throw new ApiError(
      500,
      "Something went wrong while generating access and refresh tokens"
    );
  }
};

const RegisterUser = asyncHandler(async (req, res) => {
  const { name, number, email, password } = req.body;

  if (
    [name, email, password].some(function (field) {
      field.trim() === "";
    })
  ) {
    throw new ApiError(400, "All fields must be filled in");
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) throw new ApiError(404, "User already exists");

  const newUser = await User.create({
    name,
    number,
    email,
    password,
  });

  const CreatedUser = await User.findById(newUser._id).select("-password ");

  if (!CreatedUser)
    throw new ApiError(
      500,
      "Failed to create user due to some internal error! Please try again"
    );

  const { AccessToken, RefreshToken } = await generateAccessAndRefreshTokens(
    CreatedUser?._id
  );

  SendMail(
    email,
    "Successfully registered at JARVIS",
    "Welcome to JARVIS",
    `<b><h1>Congratulations Mr./Mrs. ${name} </h1>,<br/> <h3>You have successfully register to JARVIS.<br/>
    Here are your Account details
      Name:${name}
      Contact:${number}
      Email:${email}
   </h3> <b/>`
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(201)
    .cookie("RefreshToken", RefreshToken, options)
    .cookie("AccessToken", AccessToken, options)
    .json(
      new ApiResponse(
        201,
        {
          user: CreatedUser,
          tokens: {
            AccessToken,
            RefreshToken,
          },
        },
        "User registration completed successfully"
      )
    );
});

const LoginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    throw new ApiError(401, "email and password are required");

  const user = await User.findOne({ email });

  if (!user) throw new ApiError(404, "Provided email is not found");

  const isValid = await user.isPasswordCorrect(password);

  if (!isValid) throw new ApiError(401, "Entered Credential is not correct");

  const { AccessToken, RefreshToken } = await generateAccessAndRefreshTokens(
    user?._id
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(201)
    .cookie("RefreshToken", RefreshToken, options)
    .cookie("AccessToken", AccessToken, options)
    .json(
      new ApiResponse(
        201,
        {
          user,
          tokens: {
            AccessToken,
            RefreshToken,
          },
        },
        "User Logged In successfully"
      )
    );
});

const regenerateRefreshToken = asyncHandler(async (req, res) => {
  try {
    const token = req.cookies.RefreshToken || req.body.RefreshToken;

    if (!token) throw new ApiError(401, "Unauthorized request");

    const DecodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findById(DecodedToken._id).select(
      "-password -refreshToken"
    );

    if (!user) throw new ApiError(400, "Invalid Token");

    const AccessToken = user.generateAccessToken();
    const RefreshToken = user.generateRefreshToken();

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(201)
      .cookie("RefreshToken", RefreshToken, options)
      .cookie("AccessToken", AccessToken, options)
      .json(
        new ApiResponse(
          201,
          {
            user,
            tokens: {
              AccessToken,
              RefreshToken,
            },
          },
          "Refresh token regenerated successfully"
        )
      );
  } catch (error) {
    throw new ApiError(401, error.message || "Invalid Token");
  }
});

export { RegisterUser, LoginUser, regenerateRefreshToken };
