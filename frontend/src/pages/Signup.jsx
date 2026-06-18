import {useState} from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthField, AuthSubmit, Mail, Lock, User } from "@/components/auth/AuthForm";

function Signup(){

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  // const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSignup = async(e) => {

    e.preventDefault()

    setLoading(true)


    try {

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/signup`,
        {
          email,
          password
        }
      )

      console.log(response.data);

      alert("Signup successful")
      navigate("/login")
    } catch (error) {
      console.log(error);

      alert("Signup failed")
    } finally {
    setLoading(false)
  }
  }

  return(
    <AuthLayout title="Create your account" subtitle="Start organizing your documents in minutes.">
      <form onSubmit={handleSignup} className="space-y-4">
        {/* <AuthField
          icon={User}
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        /> */}
        <AuthField
          icon={Mail}
          type="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <AuthField
          icon={Lock}
          type="password"
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <p className="text-[11px] text-muted-foreground leading-relaxed">
          By creating an account, you agree to our{" "}
          <a className="text-primary hover:text-primary-glow">Terms</a> and{" "}
          <a className="text-primary hover:text-primary-glow">Privacy Policy</a>.
        </p>

        <AuthSubmit loading={loading}>Create account</AuthSubmit>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
       <button
  type="button"
  onClick={() => navigate("/login")}
  className="font-medium text-primary hover:text-primary-glow transition-colors"
>
  Sign in
</button>
      </p>
    </AuthLayout>
  );
}


export default Signup