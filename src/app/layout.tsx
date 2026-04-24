import "./globals.css"; // Optional: remove this line if you don't have a globals.css file yet

export const metadata = {
  title: 'Audio Transcription Portal',
  description: 'AI-powered audio transcription',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
