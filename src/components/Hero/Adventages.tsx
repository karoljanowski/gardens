const adventages = [
    {
        number: "3+",
        title: "Expert Courses",
    },
    {
        number: "10k+",
        title: "Students enrolled",
    },
    {
        number: "100%",
        title: "Satisfaction",
    },
]

const Adventages = () => {
    return (
        <div className="container mx-auto px-4 py-2 my-12">
            <div className="flex flex-col justify-center items-center text-center mx-auto">
                <div className="grid grid-cols-3 gap-4">
                    {adventages.map((adventage) => (
                        <div key={adventage.title} className="flex flex-col items-center justify-center">
                            <span className="text-4xl font-bold uppercase text-emerald-400">{adventage.number}</span>
                            <p className="text-neutral-300 mt-2">{adventage.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Adventages;