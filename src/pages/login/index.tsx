import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import FormHelperText from "@mui/material/FormHelperText";
import { useRouter } from "next/router";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthContext } from "contexts";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import NextLink from "next/link";
import { useIdentifier } from "hooks";
import { useMutation } from "@tanstack/react-query";
import { authApis } from "apis";
import { LoginBody, LoginResponse } from "@types";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});
type LoginFormInputs = z.infer<typeof LoginSchema>;
function LoginPage() {
  // const router = useRouter();
  const { verifiedEmail, setVerifiedEmail } = useAuthContext();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const {
    register,
    handleSubmit,
    control,
    watch,
    unregister,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    mode: "all",
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: verifiedEmail,
    },
  });

  useIdentifier({ setValue });

  // useEffect(() => {
  //   if (router.isReady) {
  //     const query = router.query;
  //     const identifier = query.identifier as string;
  //     const isValidVerifiedEmail = z
  //       .string()
  //       .email()
  //       .safeParse(identifier).success;
  //     if (!identifier || !isValidVerifiedEmail) {
  //       router.push("/verify");
  //       return;
  //     }
  //     setVerifiedEmail(identifier);
  //     setValue("email", identifier);
  //   }

  //   return () => {};
  // }, [router, setValue, setVerifiedEmail]);

  const {
    mutate: loginMutate,
    error,
    isLoading,
  } = useMutation<LoginResponse, unknown, LoginBody>({
    mutationFn: (body) => authApis.login(body),
    onSuccess: (response) => {
      //TODO: handle accessToken - redirect to workspaceDomain
    },
  });

  function onSubmit(data: LoginFormInputs) {
    loginMutate(data);
  }
  return (
    <Box
      sx={{
        width: "350px",
        height: "500px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "auto",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            mb: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="subtitle1"
            color="initial"
            fontSize={45}
            fontWeight="100"
          >
            Welcome back
          </Typography>
          <Typography
            variant="body1"
            color="initial"
            sx={{ transform: "translateY(-12px)" }}
          >
            Enter your Workplace password to continue
          </Typography>
        </Box>
        <Box
          onSubmit={handleSubmit(onSubmit)}
          component="form"
          id="entityForm"
          autoComplete="off"
          noValidate
          sx={{ "& .MuiTextField-root": { m: 1, width: "100%" } }}
        >
          <Box sx={{ cursor: "not-allowed" }}>
            <TextField
              label="Email or username"
              required
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
              fullWidth
              disabled
              sx={{ pointerEvents: "none" }}
              InputLabelProps={{ shrink: true }}
              {...register("email")}
            />
          </Box>
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              error={Boolean(errors.password)}
              autoFocus
              {...register("password")}
            />
            <FormHelperText sx={{ color: "red" }}>
              {errors.password?.message}
            </FormHelperText>
          </FormControl>
          <Box sx={{ mb: 3 }}>
            <Link href="/reset-password" fontSize={14} component={NextLink}>
              Forgot your password?
            </Link>
          </Box>
          <LoadingButton
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            loading={isLoading}
            loadingPosition="start"
            startIcon={null}
          >
            Continue
          </LoadingButton>
        </Box>
      </Box>
    </Box>
  );
}

export default LoginPage;
