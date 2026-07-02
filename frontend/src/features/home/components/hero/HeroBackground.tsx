export default function HeroBackground() {
    return (
        <>
            <div className="absolute inset-0 -z-20 bg-gradient-to-b from-primary/5 via-background to-background" />

            <div className="absolute left-0 top-0 -z-10 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />

            <div className="absolute bottom-0 right-0 -z-10 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        </>
    );
}