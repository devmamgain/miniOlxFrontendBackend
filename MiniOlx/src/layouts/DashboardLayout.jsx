import { AppHeader } from "./AppHeader";

export function DashboardLayout({
    children,
    title,
    action,
}) {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <AppHeader />

            <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                    <h1 className="text-2xl font-bold tracking-tight">
                        {title}
                    </h1>

                    {action}
                </div>

                {children}
            </main>
        </div>
    );
}