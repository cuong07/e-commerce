import { userV1 } from "@/constant/endpoint";
import { request } from "@/lib/axios";
import { UserLoginType, UserRegisterType } from "@/type";

export const signin = async (data: UserLoginType) => {
  try {
    const response = await request.post(userV1.USER_LOGIN, data);
    return response.data;
  } catch (error: any) {
    console.log("LOGIN_ERROR: ", error);
    throw error;
  }
};

export const signup = async (data: UserRegisterType) => {
  try {
    const response = await request.post(userV1.USER_REGISTER, data);
    return response;
  } catch (error: any) {
    console.log("REGISTER_ERROR: ", error);
    throw error;
  }
};
