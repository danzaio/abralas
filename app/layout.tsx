import { Inter } from "next/font/google";
import "./globals.css";
import { EtherealCursor } from "@/components/EtherealCursor";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

export const metadata = {
    title: "ABRALAS",
    description: "O Deus dos Caminhos. O Agente da Fluidez.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-br" className="dark">
            <body
                className={`${inter.variable} antialiased bg-black text-zinc-100 selection:bg-red-900 selection:text-white`}
            >
                <EtherealCursor />
                {children}
            </body>
        </html>
    );
}
