interface BannerProps {
    title: string,
    description: string
}

const Banner: React.FC<BannerProps> = ({ title, description }) => {
    return (
        <div className="banner bg-gradient-to-br from-indigo-800 to-indigo-500 text-white p-8 text-center m-4 rounded-lg h-56 flex flex-col justify-center items-center">
            <h2 className="text-3xl font-bold">{title}</h2>
            <p className="text-lg">{description}</p>
        </div>
    );
}

export default Banner;