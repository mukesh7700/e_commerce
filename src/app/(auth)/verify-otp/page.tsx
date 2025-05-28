import { CircularProgress } from "@jamsr-ui/react";
import { Suspense } from "react";
import VerifyOtpForm from "./VerifyOtpForm";

export default function Page() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <VerifyOtpForm />
    </Suspense>
  );
}
