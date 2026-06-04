import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { registerSchema } from "../lib/validation/schemas";
import { PublicLayout } from "../layouts/PublicLayout";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { useAuth } from "../contexts/AuthContext";

export default function RegisterPage() {
    const { register: registerUser } = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = handleSubmit(async (values) => {
        try {
            await registerUser(
                values.name,
                values.email,
                values.password
            );

            navigate("/my-listings");
        } catch (err) {
            toast.error(err?.message || "Registration failed");
        }
    });

    return (
        <PublicLayout>
            <div className="mx-auto max-w-md px-4 py-10">
                <Card className="p-6">
                    <h1 className="text-2xl font-bold tracking-tight">
                        Create your account
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Start buying and selling in minutes.
                    </p>

                    <form onSubmit={onSubmit} className="mt-6 space-y-4">
                        <Input
                            label="Full name"
                            autoComplete="name"
                            {...register("name")}
                            error={errors.name?.message}
                        />

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
                            autoComplete="new-password"
                            {...register("password")}
                            error={errors.password?.message}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            loading={isSubmitting}
                        >
                            Create account
                        </Button>
                    </form>

                    <p className="mt-4 text-center text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="font-medium text-primary hover:underline"
                        >
                            Log in
                        </Link>
                    </p>
                </Card>
            </div>
        </PublicLayout>
    );
}