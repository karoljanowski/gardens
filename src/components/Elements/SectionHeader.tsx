type SectionHeaderProps = {
    icon: React.ReactNode;
    title: string;
    badgeText: string;
    count?: number;
}

const SectionHeader = ({ icon, title, badgeText, count }: SectionHeaderProps) => {
    return (
        <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                {icon}
            </div>
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">{title}</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-neutral-600 to-neutral-700"></div>
            <span className="text-sm text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-3 py-1 rounded-full">
                {count} {badgeText}{count !== 1 ? 's' : ''}
            </span>
        </div>
    )
}

export default SectionHeader;