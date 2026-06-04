import { useState } from "react";

import {
    Link,
    useNavigate,
} from "react-router-dom";

import {
    Store,
    Plus,
    LogOut,
    LayoutDashboard,
    Menu,
    X,
} from "lucide-react";

import { useAuth } from "../contexts/AuthContext";

import { Button } from "../components/ui/Button";
import { ConfirmDialog } from "../components/ui/ConfirmDialog";
import { createPortal } from "react-dom";

export function AppHeader() {
    const {
        isAuthenticated,
        user,
        logout,
    } = useAuth();

    const navigate =
        useNavigate();

    const [mobileOpen, setMobileOpen] =
        useState(false);

    const [logoutOpen, setLogoutOpen] =
        useState(false);

    const onLogout = async () => {
        await logout();

        setLogoutOpen(false);

        navigate("/");
    };

    return (
        <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
                <Link
                    to="/"
                    className="flex items-center gap-2 text-lg font-bold text-foreground"
                >
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <Store className="h-4 w-4" />
                    </span>

                    Marketplace
                </Link>

                <nav className="hidden items-center gap-2 md:flex">
                    {isAuthenticated ? (
                        <>
                            <Link
                                to="/my-listings"
                                className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
                            >
                                <LayoutDashboard className="h-4 w-4" />
                                My Listings
                            </Link>

                            <Link to="/create-listing">
                                <Button size="sm">
                                    <Plus className="h-4 w-4" />
                                    Sell
                                </Button>
                            </Link>

                            <span className="ml-2 text-sm text-muted-foreground">
                                Hi, {user?.name}
                            </span>

                            <button
                                onClick={() =>
                                    setLogoutOpen(true)
                                }
                                className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                                title="Log out"
                            >
                                <LogOut className="h-4 w-4" />
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                >
                                    Log in
                                </Button>
                            </Link>

                            <Link to="/register">
                                <Button size="sm">
                                    Sign up
                                </Button>
                            </Link>
                        </>
                    )}
                </nav>

                <button
                    onClick={() =>
                        setMobileOpen(
                            (value) => !value
                        )
                    }
                    className="rounded-md p-2 hover:bg-muted md:hidden"
                    aria-label="Menu"
                >
                    {mobileOpen ? (
                        <X className="h-5 w-5" />
                    ) : (
                        <Menu className="h-5 w-5" />
                    )}
                </button>
            </div>

            {mobileOpen && (
                <div className="border-t border-border bg-card p-4 md:hidden">
                    <div className="flex flex-col gap-2">
                        {isAuthenticated ? (
                            <>
                                <Link
                                    to="/my-listings"
                                    onClick={() =>
                                        setMobileOpen(false)
                                    }
                                    className="rounded-md px-3 py-2 text-sm hover:bg-muted"
                                >
                                    My Listings
                                </Link>

                                <Link
                                    to="/create-listing"
                                    onClick={() =>
                                        setMobileOpen(false)
                                    }
                                >
                                    <Button fullWidth>
                                        <Plus className="h-4 w-4" />
                                        Sell an item
                                    </Button>
                                </Link>

                                <Button
                                    variant="outline"
                                    fullWidth
                                    onClick={() => {
                                        setMobileOpen(false);
                                        setLogoutOpen(true);
                                    }}
                                >
                                    Log out
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    onClick={() =>
                                        setMobileOpen(false)
                                    }
                                >
                                    <Button
                                        variant="outline"
                                        fullWidth
                                    >
                                        Log in
                                    </Button>
                                </Link>

                                <Link
                                    to="/register"
                                    onClick={() =>
                                        setMobileOpen(false)
                                    }
                                >
                                    <Button fullWidth>
                                        Sign up
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}

            {logoutOpen &&
                createPortal(
                    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0 bg-black/50"
                            onClick={() => setLogoutOpen(false)}
                        />

                        {/* Modal */}
                        <div className="relative z-10 w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Log out?
                            </h2>

                            <p className="mt-2 text-sm text-gray-600">
                                You'll need to sign in again to manage your listings.
                            </p>

                            <div className="mt-6 flex justify-end gap-3">
                                <button
                                    onClick={() => setLogoutOpen(false)}
                                    className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={onLogout}
                                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                                >
                                    Log out
                                </button>
                            </div>
                        </div>
                    </div>,
                    document.body
                )}
        </header>
    );
}