import { CircularProgress } from "@jamsr-ui/react";
import { Suspense } from "react";
import ResetPasswordForm from "./ResetPasswordForm";

export default function Page() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <ResetPasswordForm/>
    </Suspense>
  );
}
