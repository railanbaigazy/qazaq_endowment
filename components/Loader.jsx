"use client";

export default function Loader() {
    return (
        <div className="fixed w-screen h-screen inset-0 flex items-center justify-center z-50 bg-gradient-to-r from-indigo-800 to-indigo-900">
            <div className="flex flex-col items-center">
                {/* White Spinning Circle */}
                <div className="w-20 h-20 border-4 border-t-4 border-l-4 border-white rounded-full animate-spin"></div>
            </div>
        </div>
    );
}