import React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthContext } from "contexts";
const VerifySchema = z.object({
  email: z.string().email(),
});
type VerifyFormInputs = z.infer<typeof VerifySchema>;
function VerifyPage() {
  const router = useRouter();
  const { verifiedEmail, setVerifiedEmail } = useAuthContext();
  const {
    register,
    handleSubmit,
    control,
    watch,
    unregister,
    clearErrors,
    formState: { errors },
  } = useForm<VerifyFormInputs>({
    mode: "all",
    resolver: zodResolver(VerifySchema),
  });
  function handleVerifyEmail() {
    //TODO: call API verify email
  }
  function onSubmit(data: VerifyFormInputs) {
    setVerifiedEmail(data.email);
    router.push({ pathname: "/login", query: { identifier: data.email } });
  }
  return (
    <Box
      sx={{
        width: "300px",
        height: "500px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "auto",
      }}
    >
      <Box>
        <Typography
          variant="subtitle1"
          color="initial"
          fontSize={45}
          fontWeight="100"
          textAlign={"center"}
        >
          FUniverse
        </Typography>
        <Box
          onSubmit={handleSubmit(onSubmit)}
          component="form"
          id="entityForm"
          autoComplete="off"
          noValidate
          sx={{
            "& .MuiTextField-root": { m: 1, width: "100%" },
          }}
        >
          <InputLabel
            htmlFor="email"
            sx={{ color: "black", fontWeight: 600, fontSize: "18px" }}
          >
            Enter your email to start using FUniverse
          </InputLabel>
          <TextField
            required
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
            fullWidth
            autoFocus
            {...register("email")}
          />
          <Button variant="contained" color="primary" fullWidth type="submit">
            Continue
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default VerifyPage;
