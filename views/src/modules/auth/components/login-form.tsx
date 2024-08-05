import { useForm } from "react-hook-form";
import { LoginFormSchema, LoginFormType } from "../utils/login-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../core/components/ui/form";
import React, { useState } from "react";
import { Input } from "../../core/components/ui/input";
import { Button } from "../../core/components/ui/button";
import { Alert } from "../../core/components/ui/alert";
import Text from "../../core/components/ui/text";
import { useLogin } from "../services";
import { LoaderCircle } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const { mutate: login, isPending: isAuthenticating } = useLogin();
  const location = useLocation();

  const loginForm = useForm<LoginFormType>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: location.state?.email || "",
    },
  });

  const onSubmit = (credentials: LoginFormType) => {
    setErrorMessage("");
    login(credentials, {
      onSuccess: (response) => {
        const { token } = response.data;

        localStorage.setItem("token", JSON.stringify(token));

        navigate("/");
      },
      onError: (error) => {
        if (error.response?.status === 401) {
          setErrorMessage("E-mail ou senha inválidos");
        }
      },
    });
  };

  return (
    <Form {...loginForm}>
      <form onSubmit={loginForm.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={loginForm.control}
          name="email"
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={loginForm.control}
          name="password"
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {errorMessage && (
          <Alert variant="destructive" className="w-full text-center">
            <Text truncate={false} className="small text-destructive">
              {errorMessage}
            </Text>
          </Alert>
        )}

        <Button
          type="submit"
          className="w-full gap-4"
          disabled={isAuthenticating}
        >
          {isAuthenticating && (
            <LoaderCircle className="h-4 w-4 animate-spin" />
          )}
          Entrar
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
