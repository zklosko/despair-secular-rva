import Link from "next/link"

type ButtonProps = {
    children: React.ReactNode
    href: string
    variant?: "primary" | "secondary"
}

export const Button = ({children, href, variant = "primary"}: ButtonProps) => {
    const styles = variant === "primary" ? "bg-primary text-primary-foreground" : "border border-foreground/20"

    return(
        <Link href={href} className={`inline-flex items-center justify-center rounded-button px-6 py-3 font-medium transition hover:opacity-90 ${styles}`}>
            {children}
        </Link>
    )
}