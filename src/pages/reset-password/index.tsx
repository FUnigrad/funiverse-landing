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
function ResetPasswordPage() {
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
    defaultValues: {
      email: verifiedEmail,
    },
  });
  function handleVerifyEmail() {
    //TODO: call API verify email
  }
  function onSubmit(data: VerifyFormInputs) {
    // setVerifiedEmail(data.email);
    // router.push('/login');
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
            Reset password
          </Typography>
          <Typography
            variant="body1"
            color="initial"
            sx={{ transform: "translateY(-12px)", whiteSpace: "nowrap" }}
          >
            Please add or verify your email address or Workplace username to
            reset your password.
          </Typography>
        </Box>
        <Box
          onSubmit={handleSubmit(onSubmit)}
          component="form"
          id="entityForm"
          autoComplete="off"
          noValidate
          sx={{
            "& .MuiTextField-root": { m: 1, width: "100%" },
            width: 350,
            m: "0 auto",
          }}
        >
          <TextField
            label="Email or username"
            required
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
            fullWidth
            {...register("email")}
          />
          <Button variant="contained" color="primary" fullWidth type="submit">
            Reset password
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default ResetPasswordPage;
