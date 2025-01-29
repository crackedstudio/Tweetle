// src/components/ErrorBoundary.tsx
import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white p-4">
                    <h1 className="text-4xl font-bold mb-4">
                        Oops! Something went wrong
                    </h1>
                    <p className="text-gray-400 mb-8">
                        {this.state.error?.message ||
                            "An unexpected error occurred"}
                    </p>
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
                        onClick={() => (window.location.href = "/")}
                    >
                        Refresh Page
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
