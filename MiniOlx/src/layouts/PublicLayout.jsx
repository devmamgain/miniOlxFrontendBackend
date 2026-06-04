import { AppHeader } from "./AppHeader";

export function PublicLayout({
    children,
}) {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <AppHeader />

            <main className="flex-1">
                {children}
            </main>

            <footer className="border-t border-border bg-card py-6 text-center text-xs text-muted-foreground">
                © {new Date().getFullYear()} Marketplace
            </footer>
        </div>
    );
}