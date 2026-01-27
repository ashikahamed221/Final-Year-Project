import { SignIn } from "@clerk/clerk-react";

const Login = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 80 }}>
      <SignIn routing="path" path="/login" />
    </div>
  );
};

export default Login;
