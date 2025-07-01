type SectionHeaderProps = {
    icon: React.ReactNode;
    title: string;
    badgeText: string;
    count?: number;
}

const SectionHeader = ({ icon, title, badgeText, count }: SectionHeaderProps) => {
    return (
        <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                {icon}
            </div>
            <h2 className="text-3xl font-bold">{title}</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-gray-600 to-gray-700"></div>
            <span className="text-sm text-muted-foreground bg-white px-3 py-1 rounded-full">
                {count} {badgeText}{count !== 1 ? 's' : ''}
            </span>
        </div>
    )
}

export default SectionHeader;