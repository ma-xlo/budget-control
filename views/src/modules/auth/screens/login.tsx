import { Button } from "@core/components/ui/button";
import { Input } from "@core/components/ui/input";
import { Label } from "@core/components/ui/label";
import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/login-form";

const LoginScreen = () => {
  return (
    <div className="w-full lg:grid lg:grid-cols-2 min-h-svh">
      <div className="flex items-center justify-center px-4 lg:px-0 py-12 min-h-svh">
        <div className="mx-auto grid w-full max-w-sm gap-6 rounded-xl border p-6 lg:rounded-none lg:border-none lg:p-0">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Entre com a sua conta
            </p>
          </div>
          <LoginForm />
          <div className="mt-4 text-center text-sm">
            Não tem uma conta?{" "}
            <Link to="/register" className="underline">
              Cadastrar
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-dark-pattern lg:block opacity-50"></div>
    </div>
  );
};

export default LoginScreen;
