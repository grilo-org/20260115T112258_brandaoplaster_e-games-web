import React, { useEffect, useRef, useState } from "react";
import { Button, Col, FormControl, InputGroup, Row } from "react-bootstrap";
import BlueBackground from "@/components/shared/bluebackground";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import AuthState from "@/dtos/authState";
import User from "@/dtos/user";
import { toast } from "react-toastify";
import UsersService from "@/services/users";
import { setLoggedUser } from "@/store/modules/auth";
import Link from "next/link";

interface SignUpProps {
  titlePhrase: string;
  buttonPhrase: string;
}

const SignUpForm: React.FC<SignUpProps> = ({ titlePhrase, buttonPhrase }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const passwordRef = useRef(null);
  const loggedUser: User = useSelector(
    (state: AuthState) => state.auth.loggedUser
  );

  useEffect(() => {
    if (loggedUser) {
      setEmail(loggedUser.email);
      if (passwordRef && passwordRef.current) {
        // @ts-ignore
        passwordRef.current.focus();
      }
    }
  }, [loggedUser]);

  const handleSubmit = async (evt: React.FormEvent): Promise<void> => {
    evt.preventDefault();

    if (password !== passwordConfirmation) {
      toast.error("Passwords don't match!");
      return;
    }

    try {
      await UsersService.signUp({
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });

      toast.info("User created successfully!");
      dispatch(
        setLoggedUser({
          id: 0,
          name,
          email,
          profile: "client",
        })
      );

      setEmail("");
      setPassword("");
      setPasswordConfirmation("");
      setName("");
    } catch (error) {
      // @ts-ignore
      if (error.response.data.errors) {
        // @ts-ignore
        toast.warning(error.response.data.errors.full_messages[0]);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Row>
        <Col lg={{ span: 6, offset: 3 }} md={{ span: 8, offset: 2 }}>
          <BlueBackground>
            <h4>{titlePhrase}</h4>
            <InputGroup className="mt-3">
              <FormControl
                placeholder="Name"
                value={name}
                type="text"
                onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
                  setName(evt.target.value)
                }
                ref={passwordRef}
                required
              />
            </InputGroup>
            <InputGroup className="mt-3">
              <FormControl
                placeholder="E-mail"
                value={email}
                type="email"
                onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(evt.target.value)
                }
                ref={passwordRef}
                required
              />
            </InputGroup>
            <InputGroup className="mt-3">
              <FormControl
                placeholder="Password"
                value={password}
                type="password"
                onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(evt.target.value)
                }
                required
              />
            </InputGroup>
            <InputGroup className="mt-3">
              <FormControl
                placeholder="Password Confirmation"
                value={passwordConfirmation}
                type="password"
                onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
                  setPasswordConfirmation(evt.target.value)
                }
                required
              />
            </InputGroup>
            <Button type="submit" className="btn btn-info mt-3 w-100">
              {buttonPhrase}
            </Button>
            <hr />
            <Link href="/auth/passwordrecovery">I forgot my password</Link>
          </BlueBackground>
        </Col>
      </Row>
    </form>
  );
};

export default SignUpForm;
