import { SignUp } from "@clerk/clerk-react";

const Register = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 80 }}>
      <SignUp routing="path" path="/register" />
    </div>
  );
};

export default Register;