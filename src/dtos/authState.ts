import User from "./user"

export default interface AuthState {
  auth: {
    loggedUser: User;
  }
}
