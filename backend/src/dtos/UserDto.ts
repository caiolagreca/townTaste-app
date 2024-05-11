/* this file excludes sensitive data from the response payload. A DTO (Data Transfer Object) can help you control what data is sent to the client. This is not only good for security but also for managing data bandwidth and ensuring that the client receives only what it needs to function. */

import { IUser } from "src/types/types";

export function UserDto(user: IUser) {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    age: user.age,
    email: user.email,
    role: user.role,
    phoneNumber: user.phoneNumber,
    profilePhoto: user.profilePhoto,
    address: user.address,
    createdAt: user.createdAt.toString(), // Convert Date to ISO string
    updatedAt: user.updatedAt.toString(), // Convert Date to ISO string
  };
}
