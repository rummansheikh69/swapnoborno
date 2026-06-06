import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        background: "#0f172a",
        color: "white",
        fontFamily: "sans-serif",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "5rem", margin: 0 }}>404</h1>
      <h2 style={{ marginBottom: "10px" }}>Page Not Found</h2>

      <p style={{ opacity: 0.7 }}>
        The page you are looking for doesn’t exist or may have been moved.
      </p>

      <Link
        href="/"
        style={{
          marginTop: "20px",
          padding: "12px 24px",
          background: "white",
          color: "#0f172a",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: "bold",
        }}
      >
        Go Home
      </Link>
    </div>
  );
}
