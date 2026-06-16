import {useState} from "react"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthField, AuthSubmit, Mail, Lock } from "@/components/auth/AuthForm";
import { toast } from "react-toastify";

function Login(){

  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e) => {

    e.preventDefault()

    setLoading(true)


    try {

      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
      {
        email,
        password
      })

      localStorage.setItem(
        "token",
        response.data.token
      )

      // toast.success("Login Successful")

      // console.log(response.data);
      navigate("/dashboard")
    } catch(error) {
      console.log(error);

      toast.error("Login failed")
      
    } finally {
    setLoading(false)
  }
  }

  return(
   <AuthLayout title="Welcome back" subtitle="Sign in to your Secure Doc AI workspace.">
      <form onSubmit={handleLogin} className="space-y-4">
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
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="flex items-center justify-between text-xs">
          <label className="inline-flex items-center gap-2 text-muted-foreground cursor-pointer select-none">
            <input type="checkbox" className="h-3.5 w-3.5 rounded border-input bg-card accent-[oklch(0.62_0.22_274)]" />
            Remember me
          </label>
          <button type="button" className="font-medium text-primary hover:text-primary-glow transition-colors">
            Forgot password?
          </button>
        </div>

        <AuthSubmit loading={loading}>Sign in</AuthSubmit>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <button
  type="button"
  onClick={() => navigate("/signup")}
  className="font-medium text-primary hover:text-primary-glow transition-colors"
>
  Create one
</button>
      </p>
    </AuthLayout>
  );
}

export default Login