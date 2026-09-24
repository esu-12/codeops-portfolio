import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error Boundary caught an error:", error);
    console.error("Error details:", errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <main
          style={{
            minHeight: "70vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px 20px",
            background: "#fffaf5",
          }}
        >
          <section
            style={{
              width: "100%",
              maxWidth: "520px",
              padding: "40px 30px",
              textAlign: "center",
              background: "#ffffff",
              border: "1px solid #ead9cc",
              borderRadius: "12px",
              boxShadow: "0 8px 30px rgba(83, 46, 27, 0.08)",
            }}
          >
            <div
              style={{
                width: "56px",
                height: "56px",
                margin: "0 auto 18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                background: "#f2e0d2",
                color: "#8d2d1c",
                fontSize: "26px",
                fontWeight: "800",
              }}
            >
              !
            </div>

            <h1
              style={{
                margin: "0 0 12px",
                color: "#3a1d13",
                fontSize: "28px",
              }}
            >
              Something went wrong
            </h1>

            <p
              style={{
                margin: "0 auto 24px",
                maxWidth: "420px",
                color: "#6d5145",
                fontSize: "14px",
                lineHeight: "1.6",
              }}
            >
              We couldn't display this page right now. Please try
              again or return to the Mesob House home page.
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              <button
                type="button"
                onClick={this.handleReload}
                style={{
                  padding: "11px 20px",
                  border: "none",
                  borderRadius: "6px",
                  background: "#8d2d1c",
                  color: "#ffffff",
                  fontSize: "13px",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                Try Again
              </button>

              <button
                type="button"
                onClick={this.handleGoHome}
                style={{
                  padding: "11px 20px",
                  border: "1px solid #d9c5b8",
                  borderRadius: "6px",
                  background: "#ffffff",
                  color: "#5d4035",
                  fontSize: "13px",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                Go Home
              </button>
            </div>

            {import.meta.env.DEV && this.state.error && (
              <details
                style={{
                  marginTop: "24px",
                  textAlign: "left",
                  color: "#6d5145",
                  fontSize: "12px",
                }}
              >
                <summary
                  style={{
                    cursor: "pointer",
                    fontWeight: "700",
                  }}
                >
                  Developer error details
                </summary>

                <pre
                  style={{
                    marginTop: "10px",
                    padding: "12px",
                    overflowX: "auto",
                    background: "#f8f2ed",
                    borderRadius: "6px",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;