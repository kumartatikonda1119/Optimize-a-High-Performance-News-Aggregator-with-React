import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-paper text-white">
          <div className="glass rounded-3xl p-8 text-center">
            <h2 className="text-2xl text-white">Something went off-script</h2>
            <p className="mt-3 text-sm text-white/60">
              Reload the page to restore the signal.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
