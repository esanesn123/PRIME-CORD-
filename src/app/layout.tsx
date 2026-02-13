import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SocketProvider } from "@/components/providers/socket-provider";
import { ModalProvider } from "@/components/providers/modal-provider";
import { cn } from "@/lib/utils";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "PRIMECORD",
    description: "Advanced Messaging Platform",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={cn(font.className, "bg-[#313338] dark:bg-[#313338]")}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem={false}
                    storageKey="discord-theme"
                >
                    <SocketProvider>
                        <ModalProvider />
                        {children}
                    </SocketProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
