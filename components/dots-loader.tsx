
const DotsLoader = () => {
    return (
        <div className="flex space-x-2">
            <div className="h-1 w-1 bg-stone-500 rounded-full animate-bounce"></div>
            <div className="h-1 w-1 bg-stone-500 rounded-full animate-bounce [animation-delay:-.15s]"></div>
            <div className="h-1 w-1 bg-stone-500 rounded-full animate-bounce [animation-delay:-.3s]"></div>
        </div>
    )
}

export default DotsLoader;