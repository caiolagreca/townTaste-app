/* this file excludes sensitive data from the response payload. A DTO (Data Transfer Object) can help you control what data is sent to the client. This is not only good for security but also for managing data bandwidth and ensuring that the client receives only what it needs to function. */

import { IUser } from "src/types/types";

export function UserDto(user: IUser) {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName || null,
    age: user.age,
    email: user.email,
    role: user.role,
    phoneNumber: user.phoneNumber || null,
    profilePhoto: user.profilePhoto || null,
    address: user.address || null,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}
