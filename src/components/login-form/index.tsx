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

interface LoginProps {
  titlePhrase: string;
  buttonPhrase: string;
}

const LoginForm: React.FC<LoginProps> = ({ titlePhrase, buttonPhrase }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
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

    try {
      const response = await UsersService.signIn({ email, password });
      const { id, email: userEmail, name, profile } = response.data.data;

      const user = {
        id,
        email,
        name,
        profile,
      };

      dispatch(setLoggedUser(user));
      toast.info("Login successfully!");
      router.push(user.profile === "admin" ? "/admin/" : "/");
    } catch (error) {
      toast.error("Invalid email or password!");
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
                placeholder="Meu e-mail"
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
                placeholder="Senha"
                value={password}
                type="password"
                onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(evt.target.value)
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
    </form >
  );
};

export default LoginForm;
