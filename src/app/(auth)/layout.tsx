const AuthLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <div className="h-full flex items-center justify-center bg-[#313338]">
            <div className="bg-zinc-800/80 p-10 rounded-lg shadow-xl backdrop-blur-sm">
                {children}
            </div>
        </div>
    );
}

export default AuthLayout;
