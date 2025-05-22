export default function NotFoundLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="w-full">{children}</div>
      </body>
    </html>
  );
}
