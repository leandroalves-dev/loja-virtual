const Loading = () => {
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black/80 z-50">
            <div className="w-10 h-10 border-4 border-pink-300 border-t-pink-700 rounded-full animate-spin mr-5"></div>
        </div>
    );
}
  
export default Loading;
  