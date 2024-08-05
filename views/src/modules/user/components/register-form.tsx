import { useForm } from "react-hook-form";
import {
  RegisterFormSchema,
  RegisterFormType,
} from "../utils/register-form-schema";
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
import { useRegister } from "../services";
import { LoaderCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CPFMask } from "../utils/helpers/cpf-mask";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const { mutate: register, isPending: isCreatingAccount } = useRegister();

  const registerForm = useForm<RegisterFormType>({
    resolver: zodResolver(RegisterFormSchema),
  });

  const onSubmit = (credentials: RegisterFormType) => {
    setErrorMessage("");
    register(credentials, {
      onSuccess: () => {
        navigate("/login", {
          state: {
            email: credentials.email,
          },
        });
      },
      onError: (error) => {
        if (
          error.response?.status === 400 &&
          (error.response.data as any).message
        ) {
          setErrorMessage((error.response.data as any).message);
        }
      },
    });
  };

  return (
    <Form {...registerForm}>
      <form
        onSubmit={registerForm.handleSubmit(onSubmit)}
        className="grid gap-4"
      >
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={registerForm.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="grid gap-1">
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={registerForm.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="grid gap-1">
                <FormLabel>Sobrenome</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={registerForm.control}
          name="cpf"
          render={({ field }) => (
            <FormItem className="grid gap-1">
              <FormLabel>CPF</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  maxLength={14}
                  placeholder="000.000.000-00"
                  onChange={(event) => {
                    const input: HTMLInputElement =
                      event.target as HTMLInputElement;
                    input.value = CPFMask(input.value);

                    field.onChange(CPFMask(input.value));
                  }}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={registerForm.control}
          name="role"
          render={({ field }) => (
            <FormItem className="grid gap-1">
              <FormLabel>Ocupação</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={registerForm.control}
          name="email"
          render={({ field }) => (
            <FormItem className="grid gap-1">
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={registerForm.control}
          name="password"
          render={({ field }) => (
            <FormItem className="grid gap-1">
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={registerForm.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="grid gap-1">
              <FormLabel>Confirmar senha</FormLabel>
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
          disabled={isCreatingAccount}
        >
          {isCreatingAccount && (
            <LoaderCircle className="h-4 w-4 animate-spin" />
          )}
          Criar Conta
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
