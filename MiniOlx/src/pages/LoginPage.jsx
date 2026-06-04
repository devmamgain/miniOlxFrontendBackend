import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { loginSchema } from "../lib/validation/schemas";
import { PublicLayout } from "../layouts/PublicLayout";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { useAuth } from "../contexts/AuthContext";

export default function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = handleSubmit(async (values) => {
        try {
            await login(values.email, values.password);
            navigate("/my-listings");
        } catch (err) {
            toast.error(err?.message || "Login failed");
        }
    });

    return (
        <PublicLayout>
            <div className="mx-auto max-w-md px-4 py-10">
                <Card className="p-6">
                    <h1 className="text-2xl font-bold tracking-tight">
                        Welcome back
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Sign in to manage your listings?.
                    </p>

                    <form onSubmit={onSubmit} className="mt-6 space-y-4">
                        <Input
                            label="Email"
                            type="email"
                            autoComplete="email"
                            {...register("email")}
                            error={errors.email?.message}
                        />

                        <Input
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            {...register("password")}
                            error={errors.password?.message}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            loading={isSubmitting}
                        >
                            Log in
                        </Button>
                    </form>

                    <p className="mt-4 text-center text-sm text-muted-foreground">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="font-medium text-primary hover:underline"
                        >
                            Sign up
                        </Link>
                    </p>
                </Card>
            </div>
        </PublicLayout>
    );
}